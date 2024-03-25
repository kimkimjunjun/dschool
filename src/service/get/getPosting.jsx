import axios from "axios";

const getPosting = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/items'); // 게시글 데이터 앤드포인트에 GET 요청
        return response.data.hits.hits;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export default getPosting;