import React from 'react';
import { useQuery } from "react-query";
import getPosting from '../service/get/getPosting';

function Home() {
    const { isLoading: postsLoading, data: posts } = useQuery({
        queryKey: ["main", "posts"],
        queryFn: () => getPosting(),
    });

    console.log(posts);

    if (postsLoading) return <div>Loading...</div>
    return (
        <div>
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
