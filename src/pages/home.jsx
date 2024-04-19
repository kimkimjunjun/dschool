import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import getPosting from '../service/get/getPosting';
import Header from '../components/header';
import replie from "../icons/replie.png";
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination';
import Cookies from 'js-cookie';
import getPagenation from '../service/paging/getPagenation';
import getd2v from '../service/get/getd2v';
import { useRecoilState } from 'recoil';
import { d2vDataAtom } from '../recoil/atom';
import getfm from '../service/get/getfm';


function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [fmData, setFmData] = useState([]);

    const { isLoading: postsLoading, data: posts } = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () => getPosting(currentPage),
    });

    console.log(posts)
    const { data: postNumber } = useQuery({
        queryKey: ['post'],
        queryFn: () => getPagenation()
    })


    const handleIncreaseClicked = async (item_idx) => {

        // 쿠키에서 이전 item_idx 리스트를 가져온다
        const clickedItems = Cookies.get('clickedItems') ? JSON.parse(Cookies.get('clickedItems')) : [];

        // 최근 클릭된 item_idx를 배열 앞에 추가한다
        clickedItems.unshift(item_idx);

        // 배열의 크기가 3을 초과하면, 가장 오래된 값을 제거한다
        if (clickedItems?.length > 3) {
            clickedItems.pop();
        }

        // 업데이트된 배열을 다시 쿠키에 저장한다
        Cookies.set('clickedItems', JSON.stringify(clickedItems), { expires: 7 }); // 7일 동안 쿠키 유지
    }

    useEffect(() => {
        const fetchFmData = async () => {
            const clickedItems = Cookies.get('clickedItems') ? JSON.parse(Cookies.get('clickedItems')) : [];

            if (clickedItems.length === 0) {
                return;
            }

            // 수정된 부분: 클릭된 아이템들에 대해 한 번의 요청으로 추천 아이템들을 가져온다
            const recommendedItems = await getfm(clickedItems);
            if (recommendedItems) {
                setFmData(recommendedItems); // 추천 아이템들을 상태에 저장
            }
        };

        fetchFmData();
    }, []); // 의존성 배열이 비어있으므로, 컴포넌트가 마운트될 때 한 번만 실행됩니다.

    // d2vData를 사용하여 렌더링 또는 기타 로직 처리
    console.log(fmData);

    // 페이지 번호 변경 시 호출할 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // console.log(posts);

    if (postsLoading) return <div>Loading...</div>
    return (
        <div>
            <Header />
            <div className="w-full bg-gray-200 h-full">
                <div className='flex justify-center p-2'>
                    <div className='w-[40rem] h-fit border border-[#d6d6d6] bg-white'>
                        {posts.map((item, index) => (
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
                                                {item._source.replies?.length}
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
                            totalItems={postNumber}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                    <div className='w-[30rem] h-[60rem] border border-[#d6d6d6] p-3 ml-2 bg-white'>
                        <div className='w-full h-fit pb-3'>
                            <span className='flex'><p className='font-bold text-red-600'>홍길동</p>님을 위한 추천글</span>
                        </div>
                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                        <div>
                            {fmData.map((recData, index) => {

                                return (
                                    <Link to={`/board/${recData._source.item_idx}`} key={index} onClick={() => handleIncreaseClicked(recData._source.item_idx)}>
                                        <div className='w-full px-1'>
                                            <div className='flex flex-col mb-2 font-bold'>
                                                <h1 className='max-w-sm py-1 text-ellipsis overflow-hidden theboki0'>{recData._source.subject}</h1>
                                                <span className='w-full font-normal break-words text-ellipsis overflow-hidden theboki1'>{recData._source.contents}</span>
                                            </div>
                                            <div className='flex mb-2 space-x-2 font-bold items-center'>
                                                <span className='text-[#a5a5a5]'>{recData._source.created_at}</span>
                                                <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                                <span className='text-[#a5a5a5]'>{recData._source.clicked}</span>
                                                <hr className="bg-[#a5a5a5] w-0.5 h-4" />
                                                <span className='text-[#a5a5a5] flex'>
                                                    <img
                                                        className='w-5 h-5 flex self-center mt-1 mr-1'
                                                        src={replie}
                                                        alt='replie'
                                                    />
                                                    {recData._source.replies?.length}
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
