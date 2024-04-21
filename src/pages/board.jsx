import React, { useEffect, useState } from 'react'
import getPosting from '../service/get/getPosting';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/header';
import getBoarding from '../service/get/getBoarding';
import BackButton from '../components/backbutton';
import TopButton from '../components/topbutton';
import { useRecoilValue } from 'recoil';
import { d2vDataAtom } from '../recoil/atom';
import replie from "../icons/replie.png";
import Cookies from 'js-cookie';
import getd2v from '../service/get/getd2v';

function Board() {
    const { item_idx } = useParams();
    const [d2vData, setD2vData] = useState([]);

    const { isLoading: postsLoading, data: posts } = useQuery({
        queryKey: ["getBoarding", item_idx],
        queryFn: () => getBoarding(item_idx),
    });

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
        const fetchD2vData = async () => {
            const clickedItems = Cookies.get('clickedItems') ? JSON.parse(Cookies.get('clickedItems')) : [];

            if (clickedItems.length === 0) {
                return;
            }

            // 수정된 부분: 클릭된 아이템들에 대해 한 번의 요청으로 추천 아이템들을 가져온다
            const recommendedItems = await getd2v(clickedItems);
            if (recommendedItems) {
                setD2vData(recommendedItems); // 추천 아이템들을 상태에 저장
            }
        };

        fetchD2vData();
    }, []);

    console.log(d2vData);

    if (postsLoading) return <div>Loding...</div>

    return (
        <div>
            <Header />
            <div className='w-full h-fit flex justify-center mx-auto bg-gray-200'>
                <div className='p-2'>
                    {posts ? (
                        <div>
                            <div className='w-[40rem] border border-[#d6d6d6] bg-white px-3 py-5'>
                                <div className='flex'>
                                    <div className='w-0.5 h-3 text-red-600' />
                                    <h1 className='w-fit p-1 px-3 pb-5 text-2xl font-medium'>{posts._source.subject}</h1>
                                </div>
                                <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                <div className='p-2.5 space-x-3 text-[#646464] flex'>
                                    <span className='text-[#2f9741] font-bold'>{posts._source.author_nick}</span>
                                    <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                                    <span>조회수 {posts._source.clicked}</span>
                                    <hr className="bg-[#a5a5a5] w-0.5 h-4 self-center" />
                                    <span>{posts._source.created_at}</span>
                                </div>
                                <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                <div className='p-2.5'>
                                    {posts._source.contents}
                                </div>
                            </div>
                            <div className='w-[40rem] border border-[#d6d6d6] bg-white px-3 py-5 space-y-3'>
                                <div>
                                    덧글 <span className='text-[red]'>{posts._source.replies.length}</span>
                                </div>
                                {posts._source.replies.map((comment, index) => (
                                    <div key={index}>
                                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                                        <div className='pt-3'>
                                            {comment}
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className='flex'>
                                <BackButton />
                                <TopButton />
                            </div>
                        </div>
                    ) : (
                        <div>게시글을 찾을 수 없습니다.</div>
                    )}
                </div>
                <div className='pt-2'>
                    <div className='w-[30rem] h-[60rem] border border-[#d6d6d6] bg-white p-3'>
                        <div className='w-full px-5 pb-3'>
                            <span className='flex'>유사 추천글</span>
                        </div>
                        <div className='w-full h-0.5 bg-[#d6d6d6]' />
                        {d2vData.map((recData, index) => {

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
                                                    alt='d'
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
    )
}

export default Board