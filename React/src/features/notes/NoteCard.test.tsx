import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from './NoteCard';

const mockNote = {
  id: 1,
  info1: 'Test Note',
  info2: 'This is a test note.',
};

describe('NoteCard', () => {
  it('renders the note title and content', () => {
    render(<NoteCard note={mockNote} onEdit={jest.fn()} bgColor="#e3d7fc" />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
  });

  it('applies the background color', () => {
    render(<NoteCard note={mockNote} onEdit={jest.fn()} bgColor="#e3d7fc" />);
    const card = screen.getByText('Test Note').closest('.MuiPaper-root');
    expect(card).toHaveStyle('background-color: #e3d7fc');
  });

  it('calls onEdit when clicked', () => {
    const onEdit = jest.fn();
    render(<NoteCard note={mockNote} onEdit={onEdit} bgColor="#e3d7fc" />);
    const card = screen.getByText('Test Note').closest('.MuiPaper-root');
    if (card) fireEvent.click(card);
    expect(onEdit).toHaveBeenCalledWith(mockNote);
  });
}); 