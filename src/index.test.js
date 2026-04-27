import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });

  test('renders the correct initial content', () => {
    render(<App />);
    const headingElement = screen.getByText(/welcome to the app/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('handles user interactions correctly', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    
    buttonElement.click();
    
    const resultElement = screen.getByText(/you clicked the button/i);
    expect(resultElement).toBeInTheDocument();
  });

  test('displays props correctly', () => {
    const { rerender } = render(<App title="Test Title" />);
    const titleElement = screen.getByText(/test title/i);
    expect(titleElement).toBeInTheDocument();

    rerender(<App title="New Title" />);
    const newTitleElement = screen.getByText(/new title/i);
    expect(newTitleElement).toBeInTheDocument();
  });
});