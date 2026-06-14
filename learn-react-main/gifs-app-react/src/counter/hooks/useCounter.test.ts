import { beforeEach, describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";
import { act, renderHook } from "@testing-library/react";

describe("useCounter", () => {
  // beforeEach(()=>{
  //     console.log('Before each');

  // })

  // Para usar un Coustomhook una de las condiciones es estar dentro de functional component o dentro de otro hook

  test("should initialize with default value of 10", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(5);
  });

  test("should initialize with default value of 10", () => {
    const initialValue = 20;

    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test("should increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter());

    //si tuviera async entonces adentro tambien hacemos
    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(6);
  });

  test("should decrement counter when handleSubtrack is called", () => {
    const { result } = renderHook(() => useCounter());

    //si tuviera async entonces adentro tambien hacemos
    act(() => {
      result.current.handleSubstract();
    });

    expect(result.current.counter).toBe(4);
  });

  test("should reset counter when handleReset is called", () => {
    const { result } = renderHook(() => useCounter());

    //si tuviera async entonces adentro tambien hacemos
    act(() => {
      result.current.handleSubstract();
      result.current.handleSubstract();
      result.current.handleSubstract();
      result.current.handleSubstract();
    });

    expect(result.current.counter).toBe(1);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(5);
  });
});
