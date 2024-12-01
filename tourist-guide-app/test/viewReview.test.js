import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native'; // Use @testing-library/react-native for React Native
import { expect } from 'chai';
import sinon from 'sinon';
import ViewReviews from '../viewReview'; // Adjust the path to your component
import { fetchReviewsData } from '../viewReview'; // Adjust the path if necessary

describe('ViewReviews Component', () => {
  let fetchStub;

  // Before each test, we stub the fetchReviewsData function
  beforeEach(() => {
    fetchStub = sinon.stub(fetchReviewsData);
  });

  afterEach(() => {
    fetchStub.restore(); // Restore the original function after each test
  });

  it('should render reviews if data is fetched successfully', async () => {
    const reviewsData = [
      { user: 'Tonmoy', rating: 9, comment: 'Great place to visit' },
      { user: 'Hasan', rating: 7, comment: 'It was awesome' },
    ];

    // Mock the fetchReviewsData function to return the sample data
    fetchStub.resolves(reviewsData);

    render(<ViewReviews place="Beach" />);

    // Wait for the reviews to be rendered
    await waitFor(() => screen.getByText('Beach Reviews'));

    // Check if the reviews are rendered correctly
    expect(screen.getByText('Tonmoy')).to.exist;
    expect(screen.getByText('Rating: 9 / 10')).to.exist;
    expect(screen.getByText('Great place to visit')).to.exist;
    expect(screen.getByText('Hasan')).to.exist;
    expect(screen.getByText('Rating: 7 / 10')).to.exist;
    expect(screen.getByText('It was awesome')).to.exist;
  });

  it('should show an error message if there is an error fetching reviews', async () => {
    // Mock the fetchReviewsData function to throw an error
    fetchStub.rejects(new Error('Error fetching reviews'));

    render(<ViewReviews place="Beach" />);

    // Wait for the error message to be rendered
    await waitFor(() => screen.getByText('Error fetching reviews'));

    // Check if the error message is displayed
    expect(screen.getByText('Error fetching reviews')).to.exist;
  });
});
