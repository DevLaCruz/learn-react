import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { MyAwesomeApp } from "./MyAwesomeApp";

describe("MyAwesomeApp", () => {

  test("should render firstName and lastName", () => {
    render(<MyAwesomeApp />);

    // 1. Usar el ID correcto que pusiste en el componente
    const h1 = screen.getByTestId("first-name-title");

    // 2. Corregir .toContain (minúscula) y usar textContent para mayor limpieza
    expect(h1.textContent).toContain("Alejandro");
  });

  test("should match snapshot", () => {
    const { container } = render(<MyAwesomeApp />);
    expect(container).toMatchSnapshot();
  });

  test("should match snapshot of a specific element", () => {
    render(<MyAwesomeApp />);
    // Si quisieras hacer snapshot de algo específico, asegúrate de que el ID exista
    // expect(screen.getByTestId("first-name-title")).toMatchSnapshot();
  });
});