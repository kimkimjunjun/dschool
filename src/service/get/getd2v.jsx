
import axios from "axios";

const getd2v = async (item_idx) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/get_d2v_recommanded_items/${item_idx}`); // 게시물 페이지 앤드포인트에 GET 요청
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default getd2v;