import { useState, useEffect } from "react";

export const baseUrl = "http://localhost:5000/api";

//CUSTOM HOOKS NEED TO START WITH "use"
export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchUrl = async ({ url, method, body }) => {
        setError(null);
        setLoading(true);
        try {
          const res = await fetch(baseUrl + url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: body ? JSON.stringify(body) : null
          });

          if (!res.ok) 
            throw new Error("HTTPS error: " + res.status);

          const json = await res.json();
          setData(json);
        } catch (err) {
          setError(err);
          setData(null);
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

  return {fetchUrl, data, isLoading, error };
};