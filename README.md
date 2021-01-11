# SimpleRateLimiter

SimpleJSRateLimitersuper is a simple RateLimiter integrated with lru cache package.

```js
const { RateLimiterSingleton } = require("custom-rate-limiter");

//SetRateLimitOptions(timelimit in milliseconds, maximumRequestInTimeLimit);
RateLimiterSingleton.SetRateLimitOptions(4000, 2);

//ThrowLimitExceptionIfNecessary('unique identifier for a specific user')
RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("3");

//should do nothing

////////////////////////////////////////////////////////////////////////////
RateLimiterSingleton.SetRateLimitOptions(4000, 2);
RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");

//should throw rate limit exception
```
