import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { useCounter } from "../hooks/useCounter";
import { giphyApi } from "./giphy.api";


describe('giphyApi', ()=>{
    test('should be configured correctly', ()=>{
        const params = giphyApi.defaults.params
        console.log(params);
        //console.log(giphyApi.defaults);

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs')
        expect(params.lang).toBe('es')
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY)
    

        expect(params).toStrictEqual({
            
        })

    })
})