import React from 'react';
import { useQuery } from "react-query";
import Header from '../components/header';
import getSearch from '../service/search/getSearch';
import { useParams } from 'react-router-dom';

function Search() {
    const { query } = useParams();

    const { isLoading, data: results } = useQuery({
        queryKey: ["search", query],
        queryFn: () => getSearch(query),
    });

    console.log(results);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            {results.map((result, index) => {
                return (
                    <div key={index}>
                        <span>{result._source.subject}</span>
                    </div>
                )
            })}
        </div>
    )
}


export default Search;
