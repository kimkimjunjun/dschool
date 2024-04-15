
import axios from "axios";

const getfm = async (itemIdxs) => {
    try {
        // 클릭된 아이템들의 인덱스를 쿼리 파라미터로 사용하여 서버에 요청
        const response = await axios.get(`http://127.0.0.1:8000/get_combined_fm_recommended_items/`, {
            params: {
                item_idxs: itemIdxs.join(',') // 배열을 콤마로 구분된 문자열로 변환
            }
        });
        console.log(response.data);
        return response.data; // 추천 아이템들의 데이터를 반환
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default getfm;