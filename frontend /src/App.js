import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  // Step 1: Set up state to hold the data, loading state, and error state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  // Step 2: Fetch data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api") // The backend endpoint
      .then((response) => {
        setData(response.data); // Store the fetched data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error); // Handle any errors
        setLoading(false); // Stop loading if there's an error
      });
  }, []); // Empty dependency array means it runs once when the component mounts

  // Step 3: Return the JSX (UI) with the fetched data
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show error if there's an issue
  }

  return (
    <div className="App">
      <h1>React Frontend</h1>
      <h2>{data ? data.msg : "No message available"}</h2>{" "}
      {/* Display data from API */}
      {/* Optionally, you can display more structured data if needed */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}{" "}
      {/* Display raw data in JSON format */}
    </div>
  );
};

export default App;
