import "./App.css";
import { useState, useEffect } from "react";
function options(){
  return(
    
  )
}
function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function getbooks() {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=fiction&fields=key,title,author_name,cover_i,first_publish_year&limit=12"
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
  <>
    <div className="header">Bookly</div>
    <div className="backgroundbookie">
      <div className="booklists">
        {books.map((book) => (
          <div className="rowflow" key={book.key}>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt={book.title}
            />

            <div>
              <h3>{book.title}</h3>
              <p>First published: {book.first_publish_year || "Unknown"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);
}

export default App;
