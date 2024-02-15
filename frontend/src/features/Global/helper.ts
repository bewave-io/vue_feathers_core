export const sleep = async (interval: number = 1000) =>
  await new Promise((r) => setTimeout(r, interval));
