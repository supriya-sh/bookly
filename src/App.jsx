
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function getbooks() {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=fiction&fields=key,title,author_name,cover_i&limit=12"
        );

        if (!response.ok) {
          throw new Error("Err.. couldn't fetch books");
        }

        const data = await response.json();
        setBooks(data.docs);
      } catch (err) {
        setErr("Couldn't load books, reload the page");
      } finally {
        setLoading(false);
      }
    }

    getbooks();
  }, []);

  return (
    <div className="header">
      Bookly
    </div>
  );
}

export default App;
