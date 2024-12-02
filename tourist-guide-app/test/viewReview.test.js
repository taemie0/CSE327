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
        rating: 8,
        comment: 'Great place, will visit again!',
      },
      {
        user: 'Jawad',
        rating: 6,
        comment: 'Nice, but could be better.',
      },
    ];
    require('./path-to-fetchReviewsData').fetchReviewsData.mockResolvedValue(mockReviews);

    render(<ViewReviews place="Paris" />);

    // Wait for the component to finish loading data
    await waitFor(() => screen.getByText('Paris Reviews'));

    // Verify the reviews are displayed
    expect(screen.getByText('Paris Reviews')).toBeTruthy();
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Rating: 8 / 10')).toBeTruthy();
    expect(screen.getByText('Great place, will visit again!')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
    expect(screen.getByText('Rating: 6 / 10')).toBeTruthy();
    expect(screen.getByText('Nice, but could be better.')).toBeTruthy();
  });

  it('renders an error message when fetching reviews fails', async () => {
    // Mock an API error
    require('./path-to-fetchReviewsData').fetchReviewsData.mockRejectedValue(new Error('Error fetching reviews'));

    render(<ViewReviews place="Paris" />);

    // Wait for the error to appear
    await waitFor(() => screen.getByText('Error fetching reviews'));

    // Verify the error message is displayed
    expect(screen.getByText('Error fetching reviews')).toBeTruthy();
  });
});
