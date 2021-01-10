import { LRUExtended } from "./LRUExtended";

export class RateLimiterSingleton {

  static s_Instance;
  static s_TimeLimit;
  static s_Requests;
  static s_LRUInstance;
  static s_RequestsToAccumulate;

  constructor(getInstanceIdentifier) {
    if (!getInstanceIdentifier.isCalledByGetInstance) throw new Error('cant create rate limiter object with new operator, please use getInstance');
    RateLimiterSingleton.s_LRUInstance = new LRUExtended(RateLimiterSingleton.s_RequestsToAccumulate);
    RateLimiterSingleton.s_Instance = this;
  }

  static GetInstance() {
    if (!RateLimiterSingleton.s_Instance) {
      if (!RateLimiterSingleton.s_TimeLimit || !RateLimiterSingleton.s_Requests)
        throw new Error(
          "please use SetRateLimitOptions to set timelimit and requests params first"
        );
      RateLimiterSingleton.s_Instance = new RateLimiterSingleton(
        {isCalledByGetInstance:true}
      );
    }

    return RateLimiterSingleton.s_Instance;
  }

  static SetRateLimitOptions(i_TimeLimit, i_Requests, i_RequestsToAccumulate) {
    RateLimiterSingleton.s_TimeLimit = i_TimeLimit;
    RateLimiterSingleton.s_Requests = i_Requests-1;
    if(i_RequestsToAccumulate) s_RequestsToAccumulate = i_RequestsToAccumulate
  }

  ThrowLimitExceptionIfNecessary(i_UserId) {
    if (RateLimiterSingleton.s_LRUInstance.get(i_UserId)) {
      if (this.checkIfRequestsExceedLimit(i_UserId)) {
        this.deleteOldRequests(i_UserId);
        const isNeedToLimitAfterDeleterOldRequests = this.checkIfRequestsExceedLimit(
          i_UserId
        );
        if (isNeedToLimitAfterDeleterOldRequests)
          throw new Error(`user ${i_UserId} exceed limit, please wait...`, 500);
      } else {
        RateLimiterSingleton.s_LRUInstance.get(i_UserId).push(new Date());
      }
    } else {
      RateLimiterSingleton.s_LRUInstance.set(i_UserId, [new Date()]);
    }

    RateLimiterSingleton.s_LRUInstance.RefreshItemLengthById(i_UserId);
  }

  deleteOldRequests(i_UserId) {
    const now = new Date().getTime();
    for (let index in RateLimiterSingleton.s_LRUInstance.get(i_UserId)) {
      const diff =
        now - RateLimiterSingleton.s_LRUInstance.get(i_UserId)[index];
      if (diff > RateLimiterSingleton.s_TimeLimit) {
        RateLimiterSingleton.s_LRUInstance.get(i_UserId).splice(index, 1);
      }
    }
  }

  checkIfRequestsExceedLimit(i_UserId) {
    return (
      RateLimiterSingleton.s_LRUInstance.get(i_UserId).length >
      RateLimiterSingleton.s_Requests
    );
  }
}
