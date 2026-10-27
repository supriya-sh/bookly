import "./App.css";
import { useState, useEffect } from "react";
import Book from "./Book.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [readingBooks, setreadingBooks]= useState(null);
  const [storyText, setstoryText]= useState("");
  const [loadingBook, setloadingBook]= useState(false);
  const [interestedBooks, setInterestedBooks] = useState([]);
  useEffect(() => {
    async function getbooks() {
      fetch("https://archive.org/advancedsearch.php?q=title%3A%22Moby%20Dick%22&output=json")
        .then((response) => response.json())
        .then((data) => console.log("ARCHIVE TEST:", data))
        .catch((error) => console.log("ARCHIVE ERROR:", error));
      try {
        const response = await fetch("https://gutendex.com/books/?languages=en");
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
async function readBooks(book) {
  setreadingBooks(book);
  setloadingBook(true);
  setstoryText("");
  try {
    const query = encodeURIComponent(
      `title:"${book.title}" AND mediatype:texts`
    );
    const response = await fetch(
      `https://archive.org/advancedsearch.php?q=${query}&fl[]=identifier&fl[]=title&rows=10&output=json`
    );
    if (!response.ok) {
      throw new Error("Archive search failed");
    }
    const data = await response.json();
    const results = data.response.docs;
    console.log("Book clicked:", book.title);
    console.log("Archive results:", results);
    if (results.length === 0) {
      throw new Error("No matching book found");
    }
    setreadingBooks({
      ...book,
      archiveId: results[0].identifier,
    });
  } catch (error) {
    console.error(error);
    setstoryText("Couldn't find this book on Internet Archive.");
  } finally {
    setloadingBook(false);
  }
}
  function toggleInterested(bookId) {
    setInterestedBooks((previousBooks) =>
      previousBooks.includes(bookId)
        ? previousBooks.filter((id) => id !== bookId) : [...previousBooks, bookId]
    );
}
return (
  <Routes>
    <Route
      path="/"
      element={
        <div className="appsiee">
          <aside className="sidebar">
            <nav className="navigationbar">
              <a href="/home" className="sidebarlinkyy">
                <span className="sidebarsymbol">合</span>
                <span className="labels">Home</span>
              </a>
              <a href="/reading" className="sidebarlinkyy">
                <span className="sidebarsymbol">♟</span>
                <span className="labels">Reading...</span>
              </a>
              <a href="/interested" className="sidebarlinkyy">
                <span className="sidebarsymbol">♡</span>
                <span className="labels">Interested in...</span>
              </a>
              <a href="/finished" className="sidebarlinkyy">
                <span className="sidebarsymbol">✓</span>
                <span className="labels">Finished</span>
              </a>
            </nav>
          </aside>
          <main className="mainapp" id="home">
            <header className="header">Bookly</header>
            <h3 className="comps">supriya enterprises 2026 ♡</h3>
            <section className="backgroundbookie">
              {loading && (
                <p className="status">books incoming ~</p>
              )}
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
                        <div className="zerocover">
                          No cover available
                        </div>
                      )}
                      <div className="detailings">
                        <h3 className="titles">{book.title}</h3>
                        <button type="button" className={`heartbutt ${interestedBooks.includes(book.id) ? "hearted" : ""}`} onClick={() => toggleInterested(book.id)}
                          aria-label={
                            interestedBooks.includes(book.id)
                              ? "Remove from interested books"
                              : "Add to interested books"
                          }
                        >
                          {interestedBooks.includes(book.id) ? "♥" : "♡"}
                        </button>
                        <p className="booksummaryy">
                          {book.summaries?.[0] || " "}
                        </p>
                        <button
                          className="readinghere" onClick={() => {readBooks(book); navigate("/reader");}}>
                          <u>Read here</u>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      }
    />
    <Route path="/reader" element={readingBooks ? 
    (
          <Book
            readingBooks={readingBooks}
            loadingBook={loadingBook}
            storyText={storyText}
            onBack={() => {
              setreadingBooks(null);
              navigate("/");
            }}
          />
        ) : (
          <p>Please go back and pick a book again..</p>
        )
      }
    />
  </Routes>
)};
export default App;