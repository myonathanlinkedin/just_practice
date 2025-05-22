import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { notesApi } from './notesApi';
import NoteCard from './NoteCard';

const mockStore = configureStore({
  reducer: {
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notesApi.middleware),
});

const mockNote = {
  id: 1,
  info1: 'Test Note',
  info2: 'This is a test note.',
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('NoteCard', () => {
  it('renders the note title and content', () => {
    renderWithProvider(<NoteCard note={mockNote} onEdit={jest.fn()} bgColor="#e3d7fc" />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
  });

  it('applies the background color', () => {
    renderWithProvider(<NoteCard note={mockNote} onEdit={jest.fn()} bgColor="#e3d7fc" />);
    const card = screen.getByText('Test Note').closest('.MuiPaper-root');
    expect(card).toHaveStyle('background-color: #e3d7fc');
  });

  it('calls onEdit when clicked', () => {
    const onEdit = jest.fn();
    renderWithProvider(<NoteCard note={mockNote} onEdit={onEdit} bgColor="#e3d7fc" />);
    const card = screen.getByText('Test Note').closest('.MuiPaper-root');
    if (card) fireEvent.click(card);
    expect(onEdit).toHaveBeenCalledWith(mockNote);
  });
}); 