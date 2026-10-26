import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [readingBooks, setreadingBooks]= useState(null);
  useEffect(() => {
    async function getbooks() {
      try {
        const response = await fetch(
          "https://gutendex.com/books/?languages=en");
        if (!response.ok) {
          throw new Error("Couldn't fetch books");
        }
        const data = await response.json();
        setBooks(data.results);
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
          {loading && <p className="status">books incoming ~</p>}
          {err && <p className="status">{err}</p>}
          {!loading && !err && books.length > 0 && (
            <div className="booklists">
              {books.map((book) => (
                <article className="rowflow" key={book.key}>
              {book.formats?.["image/jpeg"] ? (
                <img
                  src={book.formats["image/jpeg"]}
                  alt={`Cover of ${book.title}`}
                />
              ) : (
                <div className="zerocover">No cover available</div>
              )}

                  <div className="detailings">
                    <h3 className="readinghere"><u>Read here</u></h3>
                    <h3 className="titles">{book.title}</h3>
                    <p className="booksummaryy">
                      {book.summaries?.[0] || " "}
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
