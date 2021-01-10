

# SimpleRateLimiter
super simple Requests RateLimiter integrated with lru cache package.

```js
  
//SetRateLimitOptions(timelimit, maximumRequestInTimeLimit);
RateLimiterSingleton.SetRateLimitOptions(4000, 2);

//ThrowLimitExceptionIfNecessary('unique identifier for specific user')
RateLimiterSingleton.GetInstance().ThrowLimitExceptionIfNecessary("2");
```