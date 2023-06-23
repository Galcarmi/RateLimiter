# SimpleRateLimiter

SimpleJSRateLimitersuper is a simple RateLimiter integrated with lru cache package.

```js
const { RateLimiterSingleton } = require("custom-rate-limiter");

const rateLimiter = RateLimiterSingleton.GetInstance();

//SetRateLimitOptions(timelimit in milliseconds, maximumRequestInTimeLimit);
rateLimiter.SetRateLimitOptions(4000, 2);

//ThrowLimitExceptionIfNecessary('unique identifier for a specific user')
rateLimiter.ThrowLimitExceptionIfNecessary("2");
rateLimiter.ThrowLimitExceptionIfNecessary("3");

//should do nothing

////////////////////////////////////////////////////////////////////////////
rateLimiter.SetRateLimitOptions(4000, 2);
rateLimiter.ThrowLimitExceptionIfNecessary("2");
rateLimiter.ThrowLimitExceptionIfNecessary("2");
rateLimiter.ThrowLimitExceptionIfNecessary("2");

//should throw rate limit exception
```
