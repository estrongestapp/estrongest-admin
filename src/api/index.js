import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export async function signIn(user) {
    return await axios.post(`${BASE_URL}/user/signin`, user);
}

export async function getAllInfos(token) {
    return await axios.post(`${BASE_URL}/infos/all`, { token });
}