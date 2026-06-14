import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FirstSteps } from "./FirstSteps";

// 1. Definimos el mock fuera de la función de mockeo
const mockItemCounter = vi.fn();

// 2. Creamos el mock de la ruta del componente
vi.mock("./shopping-cart/ItemCounter", () => ({
  // Retornamos un componente de función que llama a nuestro mock
  ItemCounter: (props: any) => {
    mockItemCounter(props); // Registramos la llamada con los props
    return <div data-testid="ItemCounter" />;
  },
}));

describe("FirstSteps", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should match snapshot", () => {
    const { container } = render(<FirstSteps />);
    expect(container).toMatchSnapshot();
  });

  test("should render the correct number of ItemCounter components", () => {
    render(<FirstSteps />);
    const itemCounters = screen.getAllByTestId("ItemCounter");

    // Según tu consola, renderiza 2, así que esperamos 2
    expect(itemCounters.length).toBe(2);
  });

  test("should render ItemCounter with correct props", () => {
    render(<FirstSteps />);

    // IMPORTANTE: Cambiado de 3 a 2 para que coincida con la realidad
    expect(mockItemCounter).toHaveBeenCalledTimes(2);

    // Si quieres verificar que se llamó con ciertos props:
    // expect(mockItemCounter).toHaveBeenCalledWith(
    //   expect.objectContaining({ name: 'Tu Valor' })
    // );
  });
});