import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from './store';
import App from './App';

test('renders Notes App title', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const titleElement = screen.getByText(/Notes App/i);
  expect(titleElement).toBeInTheDocument();
});
