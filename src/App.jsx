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
          "https://openlibrary.org/search.json?q=fiction&fields=key,title,author_name,cover_i,first_publish_year&limit=12"
        );
        if (!response.ok) {
          throw new Error("Couldn't fetch books");
        }
        const data = await response.json();
        setBooks(data.docs);
      } catch (err) {
        setErr("Couldn't load books. Please reload the page.");
      } finally {
        setLoading(false);
      }
    }
    getbooks();
  }, []);
  return (
    <div className="appsiee">
      <aside className="sidebar">
        <nav className="navigationbar">
          <a href="#home" className="sidebarlinkyy">
            <span className="sidebarsymbol">合</span>
            <span className="labels">Home</span>
          </a>
          <a href="#reading" className="sidebarlinkyy">
            <span className="sidebarsymbol">♟</span>
            <span className="labels">Reading...</span>
          </a>
          <a href="#interested" className="sidebarlinkyy">
            <span className="sidebarsymbol">♡</span>
            <span className="labels">Interested in...</span>
          </a>
          <a href="#finished" className="sidebarlinkyy">
            <span className="sidebarsymbol">✓</span>
            <span className="labels">Finished</span>
          </a>
        </nav>
      </aside>
      <main className="mainapp" id="home">
        <header className="header">Bookly</header>
        <h3 className="comps"> supriya enterprises 2026 ♡</h3>
        <section className="backgroundbookie">
          {loading && <p className="status">Books incoming ~</p>}
          {err && <p className="status">{err}</p>}
          {!loading && !err && books.length > 0 && (
            <div className="booklists">
              {books.map((book) => (
                <article className="rowflow" key={book.key}>
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={`Cover of ${book.title}`}
                    />
                  ) : (
                    <div className="zerocover">No cover available</div>
                  )}

                  <div className="detailings">
                    <h3 className="readinghere">Read here</h3>
                    <h3 className="titles">{book.title}</h3>
                    <p>
                      First published: {book.first_publish_year || "Unknown"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
export default App;
