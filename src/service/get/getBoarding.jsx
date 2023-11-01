import axios from "axios";

const getBoarding = async (item_idx) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/items/${item_idx}`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default getBoarding;