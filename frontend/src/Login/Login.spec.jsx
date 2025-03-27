import { render, screen } from "@testing-library/react";
import Login from "./Login";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => () => null,
}));

describe("Login.spec.jsx", () => {
    it("Should render the login form with disabled login button if there are no values", () => {
        const { container} = render(<Login />);
        expect(container.firstChild).toMatchSnapshot();

        expect(screen.getByTestId('login-button')).toBeDisabled()
        expect(screen.getByTestId('register-button')).not.toBeDisabled()
    });
});
