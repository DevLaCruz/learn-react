import { render } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { useCounter } from "../hooks/useCounter";




vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 20,
        handleAdd: vi.fn(),
        handleReset: vi.fn(),
        handleSubtract: vi.fn()
    })
}));

describe('Mycounter app', ()=>{

    test('should render the component',()=>{
        render(<MyCounterApp/>)


    })

})