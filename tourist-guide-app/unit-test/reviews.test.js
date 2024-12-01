import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ViewReviews from 'E:\\CSE327_Project\\CSE327\\tourist-guide-app\\viewReview.js';
import { fetchReviewsData } from 'E:\\CSE327_Project\\CSE327\\tourist-guide-app\\tourist-guide-backend\\server.js';
// Mocking fetchReviewsData
describe('ViewReviews Component', () => {
  it('should render the error message when there is an error', async () => {
    const fakePlace = 'Test Place';

    // Mock the fetchReviewsData function to simulate an error
    const mockFetchReviewsData = sinon.stub(fetchReviewsData);
    mockFetchReviewsData.rejects(new Error('Error fetching reviews'));

    const wrapper = shallow(<ViewReviews place={fakePlace} />);
    await wrapper.instance().componentDidMount(); // Trigger component lifecycle
    wrapper.update();

    expect(wrapper.find('Text').text()).to.equal('Error fetching reviews');
  });

  it('should render reviews correctly when the data is fetched successfully', async () => {
    const fakePlace = 'Test Place';
    const mockReviews = [
      { user: 'User1', rating: 8, comment: 'Great place!' },
      { user: 'User2', rating: 6, comment: 'Nice, but could be better.' }
    ];

    const mockFetchReviewsData = sinon.stub(fetchReviewsData);
    mockFetchReviewsData.resolves(mockReviews);

    const wrapper = shallow(<ViewReviews place={fakePlace} />);
    await wrapper.instance().componentDidMount(); // Trigger component lifecycle
    wrapper.update();

    expect(wrapper.find('Text').at(1).text()).to.equal('Test Place Reviews');
    expect(wrapper.find('Text').at(2).text()).to.include('User1');
    expect(wrapper.find('Text').at(3).text()).to.include('Rating: 8 / 10');
    expect(wrapper.find('Text').at(4).text()).to.include('Great place!');
  });
});

describe('useReviewsController Hook', () => {
  it('should return an error message if the fetch fails', async () => {
    const fakePlace = 'Test Place';
    const mockFetchReviewsData = sinon.stub(fetchReviewsData);
    mockFetchReviewsData.rejects(new Error('Error fetching reviews'));

    const { result, waitForNextUpdate } = renderHook(() => useReviewsController(fakePlace));
    await waitForNextUpdate();

    expect(result.current.error).to.equal('Error fetching reviews');
    expect(result.current.reviews).to.deep.equal([]);
  });

  it('should return reviews data if the fetch is successful', async () => {
    const fakePlace = 'Test Place';
    const mockReviews = [
      { user: 'User1', rating: 8, comment: 'Great place!' },
      { user: 'User2', rating: 6, comment: 'Nice, but could be better.' }
    ];

    const mockFetchReviewsData = sinon.stub(fetchReviewsData);
    mockFetchReviewsData.resolves(mockReviews);

    const { result, waitForNextUpdate } = renderHook(() => useReviewsController(fakePlace));
    await waitForNextUpdate();

    expect(result.current.reviews).to.deep.equal(mockReviews);
    expect(result.current.error).to.equal(null);
  });
});
