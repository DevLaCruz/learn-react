import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { useCounter } from "../hooks/useCounter";


const handleAddMock = vi.fn()
const handleSubtrackMock = vi.fn()
const handleResetMock = vi.fn()


vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        counter: 5,
        handleAdd: handleAddMock, //es una funcion especial de vitest
        handleReset: handleSubtrackMock,
        handleSubtract: handleResetMock
    })
}));

describe('Mycounter app', ()=>{

    test('should render the component',()=>{
        render(<MyCounterApp/>)

        expect(screen.getByRole('heading',{level:1}).innerHTML).toContain(
            `counter: 5`
        )

        expect(screen.getByRole('button',{name:'+1'})).toBeDefined()
        expect(screen.getByRole('button',{name:'-1'})).toBeDefined()
        expect(screen.getByRole('button',{name:'Reset'})).toBeDefined()

    })


    test('should call handleAdd if button is clicked', ()=>{
        render(<MyCounterApp/>)

        const button = screen.getByRole('button', {name:'+1'})
        fireEvent.click(button)

        expect(handleAddMock).toHaveBeenCalled()
        expect(handleAddMock).toHaveBeenCalledTimes(1)
        expect(handleSubtrackMock).not.toHaveBeenCalled()
        expect(handleResetMock).not.toHaveBeenCalled()
     
    })

})