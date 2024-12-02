import add from '../calculator.js'; // Adjust path if necessary

describe('add function', () => {
  it('should return the sum of two numbers', () => {
    const result = add(2, 3);
    expect(result).toBe(5); // Jest uses toBe for strict equality checks
  });

  it('should return a negative number when adding negative numbers', () => {
    const result = add(-2, -3);
    expect(result).toBe(-5);
  });

  it('should return zero when adding zero', () => {
    const result = add(0, 0);
    expect(result).toBe(0);
  });
});
