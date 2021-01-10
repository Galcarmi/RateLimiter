import { LRUExtended } from "../src/LRUExtended";
import { RateLimiterSingleton } from "../src/RateLimiterSingleton";

afterEach(() => {
    RateLimiterSingleton.s_LRUInstance = new LRUExtended();
    console.log('after')
});

// expect(() => ...error...).not.toThrow(error)
test("should not instantiate without timelimit and requests params", () => {
  expect(() => {
    RateLimiterSingleton.GetInstance();
  }).toThrow(Error);
  // expect(()=>{new RateLimiterSingleton()}).toThrow(Error)
});

test("should not instantiate new class more then once", () => {
  expect(() => {
    RateLimiterSingleton.SetRateLimitOptions(4000, 2);
    let rl1 = RateLimiterSingleton.GetInstance();
    let rl2 = RateLimiterSingleton.GetInstance();
    if (rl1 != rl2) throw new Error("ratelimeter objects are not the same");
  }).not.toThrow(Error);
});

test("should not create ratelimiter object with new operator", () => {
  expect(() => {
    new RateLimiterSingleton();
  }).toThrow(Error);
});

test("should throw rate limit exeption", () => {
  expect(() => {
    RateLimiterSingleton.SetRateLimitOptions(4000, 2);
    RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
    RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
    RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
  }).toThrow(Error);
});

test("should throw rate limit exeption", () => {
    expect(() => {
      RateLimiterSingleton.SetRateLimitOptions(4000, 2);
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("1");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("3");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("1");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("1");
    }).toThrow(Error);
  });

test("should not throw rate limit errors", () => {
  expect(() => {
    RateLimiterSingleton.SetRateLimitOptions(4000, 1);
    RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("1");
    RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
    RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("3");
    RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("4");
  }).not.toThrow(Error);
});

test("should not throw rate limit errors", () => {
    expect(() => {
      RateLimiterSingleton.SetRateLimitOptions(4000, 2);
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("1");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("3");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("1");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("3");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("4");
      RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("4");
    }).not.toThrow(Error);
  });
