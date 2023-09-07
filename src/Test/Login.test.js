import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import store from "../store";
describe('Login Component', () => {
    test('renders login form without crashing', () => {
      render(<BrowserRouter><Provider store={store}><Login /></Provider></BrowserRouter>);
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });
  
    test('allows user to input email and password', () => {
      render(<BrowserRouter><Provider store={store}><Login /></Provider></BrowserRouter>);
      const emailInput = screen.findAllByPlaceholderText('Email');
      const passwordInput = screen.findAllByPlaceholderText('Password');
  
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password');
  
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password');
    });
  
    test('submits form when user clicks login button', async () => {
      const mockOnSubmit = jest.fn(() => Promise.resolve());
      render(<BrowserRouter><Provider store={store}><Login onSubmit={mockOnSubmit}/></Provider></BrowserRouter>);
      
      const loginButton = screen.getByRole('button', { name: 'Login' });
      userEvent.click(loginButton);
  
      await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
    });
  
    test('displays error messages for incomplete form', () => {
      render(<BrowserRouter><Provider store={store}><Login /></Provider></BrowserRouter>);
      const loginButton = screen.getByRole('button', { name: 'Login' });
      userEvent.click(loginButton);
  
      expect(screen.getByText(' required.')).toBeInTheDocument();
      expect(screen.getByText(' required.')).toBeInTheDocument();
    });
  
    test('displays error message for incorrect credentials', async () => {
      const mockOnSubmit = jest.fn(() => Promise.reject(new Error('Invalid credentials')));
      render(<BrowserRouter><Provider store={store}><Login onSubmit={mockOnSubmit} /></Provider></BrowserRouter>);
      
      const emailInput = screen.findAllByPlaceholderText('Email');
      const passwordInput = screen.findAllByPlaceholderText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });
      
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password');
      userEvent.click(loginButton);
  
      await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
  
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });