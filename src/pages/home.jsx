import React from 'react';
import { useQuery } from "react-query";
import getPosting from '../service/get/getPosting';
import Header from '../components/header';

function Home() {
    const { isLoading: postsLoading, data: posts } = useQuery({
        queryKey: ["main", "posts"],
        queryFn: () => getPosting(),
    });

    console.log(posts);

    if (postsLoading) return <div>Loading...</div>
    return (
        <div>
            <Header />
            {posts.map((post, index) => {
                return (
                    <div key={index}>
                        <span>{post._source.subject}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Home;
