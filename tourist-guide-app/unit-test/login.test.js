import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { expect } from 'chai';
import sinon from 'sinon'; // Update path as needed
import Login from 'E:\\CSE327_Project\\CSE327\\tourist-guide-app\\login.js';

// ---- Test 1: Check if Alert is triggered when fields are empty ----
describe('Login Component', () => {
  it('should show alert when email or password is empty', async () => {
    // Create a spy for Alert.alert to intercept the alert calls
    const alertSpy = sinon.spy(Alert, 'alert');

    render(<Login navigation={{ navigate: () => {} }} />); // Render the Login component

    // Simulate the Login button click with empty fields
    fireEvent.press(screen.getByText('Login'));

    // Assert that the Alert.alert was called with correct arguments
    expect(alertSpy.calledWith('Error', 'Please fill in both fields.')).to.be.true;

    alertSpy.restore(); // Restore original Alert
  });

  // ---- Test 2: Check if successful login alert is triggered ----
  it('should show success alert when fields are filled', async () => {
    const alertSpy = sinon.spy(Alert, 'alert');  // Create a spy for Alert

    render(<Login navigation={{ navigate: () => {} }} />);  // Render the Login component

    // Fill in the email and password fields
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password123');

    // Simulate pressing the Login button
    fireEvent.press(screen.getByText('Login'));

    // Check that the success alert is triggered
    expect(alertSpy.calledWith('Success', 'Login successful!')).to.be.true;

    alertSpy.restore();  // Restore original Alert
  });

  // ---- Test 3: Check if navigation to Sign Up works ----
  it('should navigate to Signup screen when "Sign up" link is pressed', () => {
    const navigateSpy = sinon.spy();  // Spy on navigation

    render(<Login navigation={{ navigate: navigateSpy }} />);  // Render the Login component

    // Simulate clicking the "Sign up" link
    fireEvent.press(screen.getByText('Sign up'));

    // Check if navigate was called with the correct screen name
    expect(navigateSpy.calledWith('Signup')).to.be.true;
  });
});
