import { useState, useEffect } from "react";

const FetchPosts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/test");
        if (!res.ok) 
          throw new Error("Network response was not ok");
        
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h3>Backend response</h3>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {JSON.stringify(data, null, 3)}
      </pre>
    </div>
  );
};

export default FetchPosts;