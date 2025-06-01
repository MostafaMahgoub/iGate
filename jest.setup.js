import "@testing-library/jest-dom";

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

window.scrollTo = jest.fn();
global.scrollTo = jest.fn();

const originalError = console.error;
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (typeof args[0] === "string" && args[0].includes("not wrapped in act")) {
      return;
    }
    if (
      typeof args[0] === "string" &&
      args[0].includes("Error fetching categories")
    ) {
      return;
    }
    originalError.call(console, ...args);
  });
});
