import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddRecipe from './AddRecipe';
import NewRecipeForm from './new-recipe-form';

jest.mock('./new-recipe-form', () => {
    return jest.fn(() => <div>Mocked New Recipe Form</div>);
});

describe('AddRecipe Component', () => {
    const mockAddRecipe = jest.fn();

    beforeEach(() => {
        render(<AddRecipe addRecipe={mockAddRecipe} />);
    });

    test('renders AddRecipe button', () => {
        const button = screen.getByRole('button', { name: /add recipe/i });
        expect(button).toBeInTheDocument();
    });

    test('calls openRecipeForm on button click', () => {
        const button = screen.getByRole('button', { name: /add recipe/i });
        fireEvent.click(button);
        expect(NewRecipeForm).toHaveBeenCalledTimes(1);
        expect(NewRecipeForm).toHaveBeenCalledWith(expect.objectContaining({
            addRecipe: mockAddRecipe
        }), {});
    });

    test('opens NewRecipeForm with unique key on multiple clicks', () => {
        const button = screen.getByRole('button', { name: /add recipe/i });
        fireEvent.click(button);
        fireEvent.click(button);
        expect(NewRecipeForm).toHaveBeenCalledTimes(2);
    });
});