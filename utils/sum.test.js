import { sum } from "./sum";

test("Sum of 1 and 2 to be 3", () => {
  expect(sum(1, 2)).toBe(3);
});
test("Sum of 5 and 2 to be 13", () => {
  expect(sum(5, 2)).toBe(13);
});
