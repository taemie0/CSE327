import { expect } from 'chai';
import sinon from 'sinon';
import add from '../calculator.js';

describe('add function', () => {
  it('should return the sum of two numbers', () => {
    const result = add(2, 3);
    expect(result).to.equal(5);
  });

  it('should return a negative number when adding negative numbers', () => {
    const result = add(-2, -3);
    expect(result).to.equal(-5);
  });

  it('should return zero when adding zero', () => {
    const result = add(0, 0);
    expect(result).to.equal(0);
  });
});