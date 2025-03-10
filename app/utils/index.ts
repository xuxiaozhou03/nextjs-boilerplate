export const extractJsonFromCallback = <T>(
  callbackString: string,
  callback = "callback"
): T | null => {
  const jsonString = callbackString.match(new RegExp(`${callback}\\((.*)\\)`));
  if (!jsonString) {
    return null;
  }
  return JSON.parse(jsonString[0]) as T;
};

const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const loopRun = async (fns: Array<() => void>, delyTime = 30) => {
  let fn = fns.shift();
  while (fn) {
    await fn();
    await wait(delyTime);
    fn = fns.shift();
  }
};
