import axios from "axios";

const getSearch = async (query) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/search?query=${query}`); // FastAPI 엔드포인트에 요청 보내기
        return response.data.hits;
    } catch (error) {
        console.error("Error:", error);
    }
};

export default getSearch;