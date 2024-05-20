import { useState, useEffect } from "react";
import { cacheManager } from "@/utils/cache";
import { Transaction } from "@/types";
import { CACHE_KEYS } from "@/enums";

export const useTransactionsApi = (url: string, retries = 3) => {
  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cachedTransactionData = cacheManager.get<Transaction[]>(
          CACHE_KEYS.TRANSACTION_DATA
        );
        if (cachedTransactionData) {
          setData(cachedTransactionData);
          return;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const json = await response.json();
        if (json.data) {
          cacheManager.set<Transaction[]>(CACHE_KEYS.TRANSACTION_DATA, json.data);
          setData(json.data);
        } else {
          throw new Error("No data returned from the API");
        }
        setError(null);
      } catch (error) {
        if (retryCount < retries) {
          setRetryCount((prevRetryCount) => prevRetryCount + 1);
        } else {
          if (error instanceof Error) {
            console.error("Failed to fetch transaction data:", error);
            setError(error);
          } else {
            setError(new Error("An unexpected error occurred"));
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, retryCount, retries]);

  return { data, isLoading, error };
};
