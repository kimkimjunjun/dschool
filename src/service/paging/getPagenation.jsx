import axios from "axios";

const getPagenation = async () => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/pagenum`);
        return res.data.total_hits;  // total_hits 정보만 반환
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default getPagenation;