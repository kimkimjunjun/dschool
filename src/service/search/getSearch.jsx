import axios from "axios";

const getSearch = async (query) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/search?query=${query}`); // FastAPI 검색결과 엔드포인트에 GET 요청
        return response.data.hits;
    } catch (error) {
        console.error("Error:", error);
    }
};

export default getSearch;