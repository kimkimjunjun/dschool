import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import getPosting from '../service/get/getPosting';
import Header from '../components/header';
import replie from "../icons/replie.png";
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination';
import Cookies from 'js-cookie';

// 코사인 유사도를 계산하는 함수
const cosineSimilarity = (vecA, vecB) => {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

// 가장 비슷한 d2v_vector 값을 찾는 함수
// const findMostSimilarVector = (targetVector, vectors) => {
//     let highestSimilarity = -1;
//     let mostSimilarVector = null;

//     vectors.forEach(vector => {
//         const similarity = cosineSimilarity(targetVector, vector.d2v_vector);
//         if (similarity > highestSimilarity) {
//             highestSimilarity = similarity;
//             mostSimilarVector = vector;
//         }
//     });

//     return mostSimilarVector;
// };

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recommended, setRecommended] = useState([]);
    const [itemsPerPage] = useState(4);

    const { isLoading: postsLoading, data: posts } = useQuery({
        queryKey: ["main", "posts"],
        queryFn: () => getPosting(),
    }); // react-query 라이브러리로 getPosting 연결

    const handleIncreaseClicked = async (item_idx) => {

        // 쿠키에서 이전 item_idx 리스트를 가져온다
        const clickedItems = Cookies.get('clickedItems') ? JSON.parse(Cookies.get('clickedItems')) : [];

        // 최근 클릭된 item_idx를 배열 앞에 추가한다
        clickedItems.unshift(item_idx);

        // 배열의 크기가 3을 초과하면, 가장 오래된 값을 제거한다
        if (clickedItems.length > 3) {
            clickedItems.pop();
        }

        // 업데이트된 배열을 다시 쿠키에 저장한다
        Cookies.set('clickedItems', JSON.stringify(clickedItems), { expires: 7 }); // 7일 동안 쿠키 유지
    }

    useEffect(() => {

        // 쿠키에서 클릭된 item_idx 리스트를 가져온다
        if (!postsLoading && posts) {
            let clickedItems = [];
            try {
                clickedItems = Cookies.get('clickedItems') ? JSON.parse(Cookies.get('clickedItems')) : [];
            } catch (error) {
                console.error('Parsing clickedItems failed', error);
            }

            // 쿠키에 저장된 item_idx에 해당하는 posts를 필터링합니다.
            const cookieVectors = posts?.filter(post => clickedItems.includes(post._source.item_idx));

            let recommendations = [];

            cookieVectors.forEach(cookieVector => {
                // 나머지 게시글들과의 유사도를 계산하고 상위 3개를 추출합니다.
                const similarityScores = posts
                    .filter(d => d._source.item_idx !== cookieVector._source.item_idx && d._source.d2v_vector.length > 0)
                    .map(post => ({
                        ...post,
                        similarity: cosineSimilarity(cookieVector._source.d2v_vector, post._source.d2v_vector),
                    }))
                    .sort((a, b) => b.similarity - a.similarity)
                    .slice(0, 3);

                recommendations.push(...similarityScores);
            });

            // 중복 제거
            recommendations = recommendations.filter((v, i, a) => a.findIndex(t => (t._source.item_idx === v._source.item_idx)) === i);

            // 추천 주제를 state에 저장합니다.
            setRecommended(recommendations.map(r => r._source));
        }
    }, [posts, postsLoading]);

    console.log(recommended);

    // 현재 페이지의 데이터 범위 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posts?.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 변경 시 호출할 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // console.log(posts);

    if (postsLoading) return <div>Loading...</div>
    return (
        <div>
            <Header />
            <div className=" bg-gray-200 h-screen">
                <div className='flex h-[37rem] justify-center p-2'>
                    <div className='w-[40rem] h-[40rem] border border-[#d6d6d6] bg-white'>
                        {currentItems.map((item, index) => (
                            <Link to={`/board/${item._source.item_idx}`} key={index} onClick={() => handleIncreaseClicked(item._source.item_idx)}>
                                <div className='w-full p-3 pr-8'>
                                    <div className='w-full h-fit mb-5'>
                                        <div className='flex mb-2 space-x-2 font-bold items-center'>
                                            <h1 className=' max-w-sm text-ellipsis overflow-hidden theboki0'>{item._source.subject}</h1>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5]'>{item._source.created_at}</span>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5]'>{item._source.clicked}</span>
                                            <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                            <span className='text-[#a5a5a5] flex'>
                                                <img
                                                    className='w-5 h-5 flex self-center mt-1 mr-1'
                                                    src={replie}
                                                    alt='d'
                                                />
                                                {item._source.replies.length}
                                            </span>
                                        </div>
                                        <span className='w-full break-words text-ellipsis overflow-hidden theboki'>{item._source.contents}</span>
                                    </div>
                                    <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                </div>
                            </Link>
                        ))}
                        {/* 페이지네이션 컴포넌트 */}
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={posts.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                    <div className='w-[30rem] h-[40rem] border border-[#d6d6d6] p-3 ml-2 bg-white'>
                        <div className='w-full h-fit pb-3'>
                            <span className='flex'><p className='font-bold text-red-600'>홍길동</p>님을 위한 추천글</span>
                        </div>
                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                        <div>
                            {recommended.slice(0, 3).map((recData, index) => {
                                return (
                                    <Link to={`/board/${recData.item_idx}`} key={index} onClick={() => handleIncreaseClicked(recData.item_idx)}>
                                        <div className='w-full px-1'>
                                            <div className='flex flex-col mb-2 font-bold'>
                                                <h1 className='max-w-sm py-1 text-ellipsis overflow-hidden theboki0'>{recData.subject}</h1>
                                                <span className='w-full font-normal break-words text-ellipsis overflow-hidden theboki1'>{recData.contents}</span>
                                            </div>
                                            <div className='flex mb-2 space-x-2 font-bold items-center'>
                                                <span className='text-[#a5a5a5]'>{recData.created_at}</span>
                                                <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                                <span className='text-[#a5a5a5]'>{recData.clicked}</span>
                                                <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                                <span className='text-[#a5a5a5] flex'>
                                                    <img
                                                        className='w-5 h-5 flex self-center mt-1 mr-1'
                                                        src={replie}
                                                        alt='d'
                                                    />
                                                    {recData.replies.length}
                                                </span>
                                            </div>
                                            <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                        </div>
                                    </Link>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
