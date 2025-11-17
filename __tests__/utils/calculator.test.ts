// TDD Example: Write tests first, then implement

describe("Calculator", () => {
  // test to insure that jest is working
  it("should add two numbers correctly", () => {
    const add = (a: number, b: number) => a + b;
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });
});
