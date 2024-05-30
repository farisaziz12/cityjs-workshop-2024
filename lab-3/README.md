# Lab 3: Network Optimization - Reducing Payload Size and LocalStorage Usage

In this lab, you'll enhance the performance of the web application by reducing payload sizes and optimizing local storage usage. The objective is to minimize data redundancy and improve overall application efficiency.

## Why This Matters

Reducing payload size and optimizing local storage helps in:

- **Faster Load Times:** Smaller payloads mean quicker data transfers, resulting in faster page loads.
- **Efficient Storage Utilization:** Prevents local storage from being filled with redundant data, ensuring more space for other critical data.
- **Improved User Experience:** Reduces waiting time for users, providing a smoother and more responsive application.

## Technical Considerations

### Local Storage Limits

- **Storage Capacity:** Most browsers limit local storage to around 5-10 MB per domain.
- **Performance Impact:** Storing large JSON strings increases the time required to parse and retrieve data, leading to slower application performance. Parsing large JSON objects can take several milliseconds, which adds up as payload size increases.

### JSON Parsing Time

- **Payload Size:** Larger JSON payloads take more time to parse, which can delay the rendering process. A JSON payload of 1 MB can take around 10-20 milliseconds to parse in a typical browser environment.

### State Redundancy and React Performance

- **Memory Consumption:** Storing redundant values in the state increases memory usage unnecessarily.
- **Render Calculation:** Increased state size leads to more complex calculations during re-renders, slowing down the application.

## Instructions


### 1. Implement Payload Reduction Techniques

To reduce payload sizes and improve performance:

- **Optimize Data Fetching:** Fetch only the necessary data fields instead of the entire dataset.