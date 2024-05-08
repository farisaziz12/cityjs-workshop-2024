# Lab 2: Request Optimization - Part One

In this lab, you'll focus on optimizing requests to improve the performance of the web application. The goal is to reduce stress on the third-party API and enhance overall efficiency. This is the first part of a multi-step process aimed at achieving optimal request handling within the application.

## Instructions

### 1. Analyze Current Behavior

Start by understanding the current behavior of the application:

- Review the code in `pages/index.tsx` to identify how data is fetched from the third-party API on each page refresh.
- Consider the implications of frequent API requests, including potential slowdowns and increased server load.

### 2. Implement Caching Mechanism

To reduce the number of requests to the third-party API and improve performance, implement a caching mechanism:

- Determine an appropriate caching strategy, considering factors such as data freshness requirements and cache expiration policies.
- Introduce client-side caching using techniques such as local storage or session storage to store fetched data.
- Modify the application logic to first check the cache for the required data before making a request to the API.

### 3. Update Fetching Logic

Revise the data fetching logic to leverage the caching mechanism:

- Modify the code to prioritize fetching data from the cache if it exists and meets the freshness criteria.
- Implement background refreshing of cached data to ensure that the application remains up-to-date while minimizing user wait time.

### 4. Test and Refine

After implementing the caching mechanism, thoroughly test the application to ensure that performance improvements are achieved:

- Verify that data is fetched from the cache when available, reducing the number of API requests.
- Test the responsiveness of the application and observe any changes in loading times.
- Fine-tune the caching strategy and data fetching logic as needed to strike a balance between performance and data freshness.

### 5. Documentation

Update this readme file with details of the caching mechanism implemented, any optimizations made to the data fetching logic, and insights gained from testing and refinement.

## Resources

- [MDN Web Docs: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) - Learn about using local storage and session storage for client-side caching.
- [Next.js Documentation](https://nextjs.org/docs) - Explore additional optimization techniques and best practices for Next.js applications.