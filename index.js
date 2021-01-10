




const rl = RateLimiterSingleton.GetInstance();
rl.ThrowLimitExceptionIfNecessary(1);
rl.ThrowLimitExceptionIfNecessary(2);
rl.ThrowLimitExceptionIfNecessary(3);
rl.ThrowLimitExceptionIfNecessary(4);
rl.ThrowLimitExceptionIfNecessary(5);
// rl.ThrowLimitExceptionIfNecessary(5);
// rl.ThrowLimitExceptionIfNecessary(5);
// rl.ThrowLimitExceptionIfNecessary(5);
console.log(LRURateLimiterSingleton.GetInstance())
console.log(LRURateLimiterSingleton.GetInstance().get(3))

