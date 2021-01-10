# SimpleRateLimiter

SimpleJSRateLimitersuper is a simple RateLimiter integrated with lru cache package.

```js
const { RateLimiterSingleton } = require("./dist/index");

//SetRateLimitOptions(timelimit, maximumRequestInTimeLimit);
RateLimiterSingleton.SetRateLimitOptions(4000, 2);

//ThrowLimitExceptionIfNecessary('unique identifier for specific user')
RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
```
