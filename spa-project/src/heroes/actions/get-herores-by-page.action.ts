import { heroApi } from "../api/hero.api"

export const getHeroresByPage = async() => {
    const {data} = await heroApi.get(`/`)

    return data
}
