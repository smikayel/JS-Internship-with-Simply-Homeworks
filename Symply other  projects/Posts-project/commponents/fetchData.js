import { BASE_API_URL } from "../constants.js";


export const fetchData = async (url) => {
    try {
        const data = await fetch(`${BASE_API_URL}${url}`);
        return data.json();
    } catch (e) {
        console.log(e.message);
    }
}