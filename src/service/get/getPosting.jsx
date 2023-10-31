import axios from "axios";

const getPosting = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/items');
        return response.data.hits.hits;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export default getPosting;