import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:3000"; // change after deployment

function App() {
  const [states, setStates] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch states
  useEffect(() => {
    axios.get(`${API}/states`)
      .then(res => setStates(res.data.data))
      .catch(err => console.error(err));
  }, []);

  // Search function
  const handleSearch = async () => {
    if (query.trim().length < 2) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API}/search?q=${query}`);
      setResults(res.data.data);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Village Search</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search village..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Results */}
      <div className="results">
        {results.length > 0 ? (
          results.map((v, i) => (
            <div key={i} className="card">
              <strong>{v.name}</strong>
              <p>{v.district}</p>
            </div>
          ))
        ) : (
          !loading && query && (
            <p>No villages found for "{query}"</p>
          )
        )}
      </div>

      {/* States */}
      <div className="states">
        <h2>States</h2>
        {states.map((s, i) => (
          <span key={i} className="state-chip">{s.name}</span>
        ))}
      </div>
    </div>
  );
}

export default App;