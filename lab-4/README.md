# Lab 2: Request Optimization - Part Two

In this lab, you'll focus on further optimizing requests to improve the performance of the web application. The goal is to reduce redundant value caching and state memory consumption.

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
