import React, { useState } from 'react';
import { useQuery } from "react-query";
import getPosting from '../service/get/getPosting';
import Header from '../components/header';
import replie from "../icons/replie.png";
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination';
import putClicked from '../service/put/putClicked';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const { isLoading: postsLoading, data: posts } = useQuery({
        queryKey: ["main", "posts"],
        queryFn: () => getPosting(),
    });

    const handleIncreaseClicked = async (item_idx) => {
        putClicked(item_idx);
    }

    // 현재 페이지의 데이터 범위 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = posts?.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 번호 변경 시 호출할 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    console.log(posts);

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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
