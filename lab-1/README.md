# Lab 1: Handling Unpredictable APIs

In this lab, you will work on enhancing the resilience of this web application. The provided codebase contains a simple dashboard that fetches transaction data from an API endpoint. Your task is to modify the application so that it attempts to recover from failures gracefully, considering that failures in the API request may occur intermittently.

## Instructions

### 1. Run the Development Server

To get started, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm`.
4. Run the development server using one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Once the development server is running, open [http://localhost:3000](http://localhost:3000) in your web browser to see the application.

### 2. Analyze the Code

Take some time to review the code in `pages/index.tsx`. Pay attention to how transaction data is fetched from the API endpoint `/api/transactions`.

### 3. Enhance Resilience

Your primary goal is to modify the application code to handle API request failures gracefully. When recovery is not possible, the application should display the existing error message to the user.
