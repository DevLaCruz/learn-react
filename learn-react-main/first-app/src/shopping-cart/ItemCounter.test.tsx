import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ItemCounter", () => {
  test("should render with default values", () => {
    const name = "Control Nintendo";

    render(<ItemCounter name={name} />);

    //screen.debug();

    expect(screen.getByText(name)).toBeDefined();
    expect(screen.getByText(name)).not.toBeNull();
  });

  test("should render with default values", () => {
    const name = "Control Nintendo";
    const quantity = 10;

    render(<ItemCounter name={name} quantity={quantity} />);

    expect(screen.getByText(quantity)).toBeDefined();
  });

  test("should increase count when +1 button is pressed", () => {
    const name = "Control Nintendo";

    render(<ItemCounter name={name} quantity={1} />);

    const [buttonAdd] = screen.getAllByRole('button');

    fireEvent.click(buttonAdd);

    expect(screen.getByText('2')).toBeDefined();
  });

  test("should decrease count when -1 button is pressed and quantity is one", () => {
    const quantity = 1;

    render(<ItemCounter name={"test item"} quantity={quantity} />);

    const [, buttonSubtract] = screen.getAllByRole("button");

    fireEvent.click(buttonSubtract)

    expect(screen.getByText('1')).toBeDefined();
  });


  test("should decrease count when -1 button is pressed and quantity is one", () => {
    const quantity = 1;
    const name = 'test item';
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    console.log(itemText.style.color)
  });
});
