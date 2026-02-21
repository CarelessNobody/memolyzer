import { useState, useEffect } from "react";

export const baseUrl = "http://localhost:5000/api";

//Backend should return JSON
//CUSTOM HOOKS NEED TO START WITH "use"
export const useFetch = ({url}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl + url);

        if (!res.ok) 
          throw new Error("HTTPS error: " + res.status);
        
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};


{/* Remember! import {useFetch} from './utils.jsx' */}

export const TestComponent = () => {
  const { data, isLoading, error } = useFetch({url: '/test'});

  if (isLoading) 
    return <div>Loading in Progress...</div>;
  if (error) 
    return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Backend response</h3>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {JSON.stringify(data, null, 3)}
      </pre>
    </div>
  );
};

