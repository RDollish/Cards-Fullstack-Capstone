
import { getToken } from "./authManager"

const apiUrl = "/api/occasion"

export const getAllOccasions = () => {
    return getToken().then(token => {
        return fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}