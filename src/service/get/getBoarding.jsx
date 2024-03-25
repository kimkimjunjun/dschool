import axios from "axios";

const getBoarding = async (item_idx) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/items/${item_idx}`); // 게시물 페이지 앤드포인트에 GET 요청
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default getBoarding;