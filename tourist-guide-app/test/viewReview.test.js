import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect'; 
import ViewReviews from '../viewReview'; 

// Mock the fetchReviewsData function
jest.mock('./path-to-fetchReviewsData', () => ({
  fetchReviewsData: jest.fn(),
}));

describe('ViewReviews Component', () => {
  it('renders reviews when data is fetched successfully', async () => {
    // Mock the API response with dummy data
    const mockReviews = [
      {
        user: 'Tonmoy',
        rating: 7,
        comment: 'It was awsome',
      },
      {
        user: 'Jawad',
        rating: 10,
        comment: 'A beautiful spot.',
      },
    ];
    require('./path-to-fetchReviewsData').fetchReviewsData.mockResolvedValue(mockReviews);

    render(<ViewReviews place="Mountain" />);

    // Wait for the component to finish loading data
    await waitFor(() => screen.getByText('Mountain Reviews'));

    // Verify the reviews are displayed
    expect(screen.getByText('Mountain Reviews')).toBeTruthy();
    expect(screen.getByText('Tonmoy')).toBeTruthy();
    expect(screen.getByText('Rating: 7 / 10')).toBeTruthy();
    expect(screen.getByText('It was awsome')).toBeTruthy();
    expect(screen.getByText('Jawad')).toBeTruthy();
    expect(screen.getByText('Rating: 10 / 10')).toBeTruthy();
    expect(screen.getByText('A beautiful spot')).toBeTruthy();
  });

  it('renders an error message when fetching reviews fails', async () => {
    // Mock an API error
    require('./path-to-fetchReviewsData').fetchReviewsData.mockRejectedValue(new Error('Error fetching reviews'));

    render(<ViewReviews place="Mountain" />);

    // Wait for the error to appear
    await waitFor(() => screen.getByText('Error fetching reviews'));

    // Verify the error message is displayed
    expect(screen.getByText('Error fetching reviews')).toBeTruthy();
  });
});
