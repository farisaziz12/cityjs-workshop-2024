# Lab 2: Request Optimization - Part One

In this lab, you'll focus on optimizing requests to improve the performance of the web application. The goal is to reduce stress on the third-party API and enhance overall efficiency. This is the first part of a multi-step process aimed at achieving optimal request handling within the application.

## Instructions

### 1. Analyze Current Behavior

Start by understanding the current behavior of the application:

- Review the code in `pages/index.tsx` to identify how data is fetched from the third-party API on each page refresh.
- Consider the implications of frequent API requests, including potential slowdowns and increased server load.
