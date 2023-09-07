import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from '../pages/SignUp';


test('submits the form with the correct values when the submit button is clicked', async () => {
  const { getByLabelText, getByRole } = render(<SignupForm />);
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  const passwordConfirmationInput = getByLabelText('Confirm Password');
  const submitButton = getByRole('button', { name: 'Sign Up' });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(passwordConfirmationInput, { target: { value: 'password' } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith('/signup', {
      email: 'test@example.com',
      password: 'password',
      passwordConfirmation: 'password',
    });
  });
});