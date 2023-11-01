import axios from "axios";

// 클릭 이벤트 핸들러를 정의합니다.
const putClicked = async (itemIdx) => {
    try {
        // 서버에 PUT 요청을 보내 조회수 증가
        await axios.put(`http://127.0.0.1:8000/items/${itemIdx}/increase-clicked`);
    } catch (error) {
        console.error("Error:", error);
    }
};

export default putClicked;