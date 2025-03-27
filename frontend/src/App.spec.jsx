import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App.spec.jsx", () => {
    it("Should have the 'Vite + React' text visible in the User Agent", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", { name: /Vite \+ React/i })
        ).toBeInTheDocument();
    });
});
