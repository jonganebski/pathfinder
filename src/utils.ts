export const timer = (loopDelay: number) =>
  new Promise((resolve) => setTimeout(resolve, loopDelay));
