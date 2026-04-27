import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import originalRecipes from './data/original-recipes';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders App component with initial recipes', () => {
    render(<App />);
    expect(screen.getByText(/My Cookbook from/i)).toBeInTheDocument();
    expect(screen.getByText(originalRecipes[0].name)).toBeInTheDocument();
  });

  test('adds a new recipe', () => {
    render(<App />);
    const addRecipeButton = screen.getByText(/Add Recipe/i);
    fireEvent.click(addRecipeButton);

    const titleInput = screen.getByPlaceholderText(/Recipe Title/i);
    const ingredientsInput = screen.getByPlaceholderText(/Ingredients/i);
    const cuisineInput = screen.getByPlaceholderText(/Cuisine/i);
    const procedureInput = screen.getByPlaceholderText(/Procedure/i);
    const authorInput = screen.getByPlaceholderText(/Author/i);
    
    fireEvent.change(titleInput, { target: { value: 'New Recipe' } });
    fireEvent.change(ingredientsInput, { target: { value: 'Ingredient 1, Ingredient 2' } });
    fireEvent.change(cuisineInput, { target: { value: 'Italian' } });
    fireEvent.change(procedureInput, { target: { value: 'Cook it well' } });
    fireEvent.change(authorInput, { target: { value: 'Chef John' } });
    
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    expect(screen.getByText('New Recipe')).toBeInTheDocument();
  });

  test('deletes a recipe', () => {
    render(<App />);
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText(originalRecipes[0].name)).not.toBeInTheDocument();
  });

  test('modifies a recipe', () => {
    render(<App />);
    const modifyButton = screen.getByText(/Modify/i);
    fireEvent.click(modifyButton);

    const titleInput = screen.getByPlaceholderText(/Recipe Title/i);
    fireEvent.change(titleInput, { target: { value: 'Modified Recipe' } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    expect(screen.getByText('Modified Recipe')).toBeInTheDocument();
  });

  test('persists recipes in localStorage', () => {
    render(<App />);
    const addRecipeButton = screen.getByText(/Add Recipe/i);
    fireEvent.click(addRecipeButton);

    const titleInput = screen.getByPlaceholderText(/Recipe Title/i);
    fireEvent.change(titleInput, { target: { value: 'Persistent Recipe' } });

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    const { recipes } = JSON.parse(localStorage.getItem('recipes'));
    expect(recipes).toHaveLength(originalRecipes.length + 1);
    expect(recipes[originalRecipes.length].name).toBe('Persistent Recipe');
  });
});