import { useState, useEffect } from "react";

export const baseUrl = "http://localhost:5000/api";

//CUSTOM HOOKS NEED TO START WITH "use"
export const useFetch = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const resetState = () => {
    setData(null);
    setError(null);
    setLoading(true);
  }

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
      return json;
    } catch (err) {
      setError(err);
      setData(null);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {fetchUrl, data, isLoading, error, resetState };
};

export const useFetchWithFile = () => { 
  const [fileData, setData] = useState(null);
  const [fileIsLoading, setLoading] = useState(false); 
  const [fileError, setError] = useState(null);

  const fileResetState = () => {
    setData(null);
    setError(null);
    setLoading(false); 
  };

  const fileFetchUrl = async ({ url, method = "GET", body }) => {
    setError(null);
    setLoading(true);
    try {
      const options = { method };

      if (body instanceof FormData) {
        options.body = body;
        // Do NOT set headers manually for FormData!
      } else if (body) {
        options.body = JSON.stringify(body);
        options.headers = { "Content-Type": "application/json" };
      }

      const res = await fetch(baseUrl + url, options);

      if (!res.ok)
        throw new Error("HTTP error: " + res.status + " " + res.statusText);

      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err);
      setData(null);
      console.error("Fetch error:", err);
      throw err; 
    } finally {
      setLoading(false); 
    }
  };

  return { fileData, fileIsLoading, fileError, fileFetchUrl, fileResetState };
};

const createNotification = (className, message, duration = 3000) => {
    const notification = document.createElement('div');
    notification.className = `${className}`;
    notification.textContent = message;

    document.getElementById('root').appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, duration)
}

export function successNotification(message, duration = 5000) {
    createNotification("success-notification", message, duration);
}

export function failureNotification(message, duration = 5000) {
    createNotification("failure-notification", message, duration);
}

export const getUserId = () => {
  const id = localStorage.getItem('userID');
  return id;
};

export const setUserId = (id) => {
  localStorage.setItem('userID', id);
}
