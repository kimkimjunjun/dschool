import axios from "axios";

const getPosting = async (page) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/get_item_list/${page}`); // 게시글 데이터 앤드포인트에 GET 요청
        return response.data.hits.hits;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export default getPosting;