import axios from "axios";
import type { Gif } from "../interfaces/gif.interface";
import type { GiphyResponse } from "../interfaces/giphy.response";
import { giphyApi } from "../api/giphy.api";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {

    if (query.trim().length ===0){
        return []
    }

    try {
            const response = await giphyApi<GiphyResponse>(`/search`, {
        params: {
            q: query,
            limit: 10,
            offset: 0,
            rating: "g",
            lang: "es",
        }
    });

    console.log(response);

    return response.data.data.map((gif) => ({
        id: gif.id,
        title: gif.title,
        url: gif.images.fixed_height.url,
        width: parseInt(gif.images.fixed_height.width),
        height: parseInt(gif.images.fixed_height.height),
    }));

    } catch (error) {
        console.error(error);
        return []
        
    }

};