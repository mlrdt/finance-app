"use client";

import { useEffect, useState } from "react";

const EXCHANGE_RATE_KEY = "aed_to_eur_rate";
const EXCHANGE_RATE_TIMESTAMP_KEY = "aed_to_eur_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function useExchangeRate() {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        // Check cache first
        const cachedRate = localStorage.getItem(EXCHANGE_RATE_KEY);
        const cachedTimestamp = localStorage.getItem(EXCHANGE_RATE_TIMESTAMP_KEY);

        if (cachedRate && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp, 10);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setRate(parseFloat(cachedRate));
            setLoading(false);
            return;
          }
        }

        // Fetch new rate
        const response = await fetch("https://api.frankfurter.app/latest?from=AED&to=EUR");
        const data = await response.json();
        const newRate = data.rates.EUR;

        // Cache the rate
        localStorage.setItem(EXCHANGE_RATE_KEY, newRate.toString());
        localStorage.setItem(EXCHANGE_RATE_TIMESTAMP_KEY, Date.now().toString());

        setRate(newRate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        // Fallback rate if API fails
        setRate(0.245);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, []);

  return { rate, loading };
}

export function formatAmount(aed: number, rate: number | null): string {
  const aedFormatted = aed.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (rate === null) {
    return `${aedFormatted} AED`;
  }

  const eur = aed * rate;
  const eurFormatted = eur.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${aedFormatted} AED (≈${eurFormatted} €)`;
}
