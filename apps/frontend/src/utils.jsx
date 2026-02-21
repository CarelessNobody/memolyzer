import { useState, useEffect } from "react";

export const baseUrl = "http://localhost:5000/api";

//CUSTOM HOOKS NEED TO START WITH "use"
export const useFetchGet = ({url}) => {
  const {data, isLoading, error} = fetchUrl({url, method: "GET", body: null});
  return { data, isLoading, error };
};

export const useFetchPost = ({url, body}) => {
  const {data, isLoading, error} = fetchUrl({url, method: "POST", body});
  return { data, isLoading, error };
};

export const useFetchPut = ({url, body}) => {
  const {data, isLoading, error} = fetchUrl({url, method: "PUT", body});
  return { data, isLoading, error };
};

export const useFetchDelete = ({url}) => {
  const {data, isLoading, error} = fetchUrl({url, method: "DELETE", body: null});
  return { data, isLoading, error };
};

export const fetchUrl = ({url, method, body}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(baseUrl + url, {
            method: method,
            headers: {
              "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : null
          });

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

{/* Remember! import {useFetchGet, useFetchPost, useFetchPut, useFetchDelete} from './utils.jsx' */}

export const TestComponent = () => {
  const { data, isLoading, error } = useFetchGet({url: '/test'});

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

