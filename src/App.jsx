import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Interested from "./interested.jsx";
import Book from "./Book.jsx";
import Finished from "./finished.jsx";
import Reading from "./reading.jsx";
function App() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [readingBooks, setreadingBooks]= useState(null);
  const [storyText, setstoryText]= useState("");
  const [loadingBook, setloadingBook]= useState(false);
  const [interestedBooks, setInterestedBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const[finishedBooks, setfinishedBooks]= useState([]);
  const [searchElement, setsearchElement]= useState("");
  const searchBook= searchElement === "" ? books :
    books.filter((book)=>
    book.title.toLowerCase().includes(searchElement.toLowerCase())
  );
  useEffect(() => {
  console.log("Hearted book IDs:", interestedBooks);
}, [interestedBooks]);
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
  );}
  function toggleFinished(bookId){
    setfinishedBooks((lastBooks) =>
      lastBooks.includes(bookId) 
        ? lastBooks.filter((id) => id !== bookId) : [...lastBooks, bookId] 
);}
  function togglereadingList(bookId){
    setReadingList((endBooks)=> 
      [...endBooks, bookId]
  );}
return (
  <div className="appsiee">
    <aside className="sidebar">
      <nav className="navigationbar">
        <Link to="/" className="sidebarlinkyy">
          <span className="sidebarsymbol">合</span>
          <span className="labels">Home</span>
        </Link>

        <Link to="/reading" className="sidebarlinkyy">
          <span className="sidebarsymbol">♟</span>
          <span className="labels">Reading...</span>
        </Link>

        <Link to="/interested" className="sidebarlinkyy">
          <span className="sidebarsymbol">♡</span>
          <span className="labels">Interested in...</span>
        </Link>

        <Link to="/finished" className="sidebarlinkyy">
          <span className="sidebarsymbol">✓</span>
          <span className="labels">Finished</span>
        </Link>
      </nav>
    </aside>

    <Routes>
      <Route
        path="/"
        element={
          <main className="mainapp" id="home">
              <header className="header">Bookly
              <input type="text" placeholder="search a book ⋆. 𐙚 ˚" className="searchbar" value={searchElement} onChange={(event)=>setsearchElement(event.target.value)}></input>
            </header>
            <h3 className="comps">supriya enterprises 2026 ♡</h3>
            <section className="backgroundbookie">
              {loading && (
                <p className="status">books incoming ~</p>
              )}
              {err && <p className="status">{err}</p>}
              {!loading && !err && books.length > 0 && (
                <div className="booklists">
                  {searchBook.length === 0 ? (
                    <p>No books found</p>
                  ) : (
                    searchBook.map((book) => (
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
                      <div className="twobuttons">
                        <button
                          type="button"
                          className={`heartbutt ${
                            interestedBooks.includes(book.id)
                              ? "hearted"
                              : ""
                          }`}
                          onClick={() => toggleInterested(book.id)}
                          aria-label={
                            interestedBooks.includes(book.id)
                              ? "Remove from interested books"
                              : "Add to interested books"
                          }
                        >
                          {interestedBooks.includes(book.id) ? "♥" : "♡"}
                        </button>
                        <button
                          type="button"
                          className={`checkedbutt ${
                              finishedBooks.includes(book.id) ? "checked" : ""
                            }`}
                          onClick={()=>toggleFinished(book.id)}
                        >
                        </button>
                      </div>
                        <p className="booksummaryy">
                          {book.summaries?.[0] || " "}
                        </p>
                        <button
                        className="readinghere"
                        onClick={() => {
                          readBooks(book);
                          navigate("/reader");
                          togglereadingList(book.id);
                        }}
                      >
                        <u>Read here</u>
                      </button>
                      </div>
                    </article>
                  ))
                  )}
                </div>
              )}
            </section>
          </main>
        }
      />
      

      <Route
        path="/interested"
        element={
          <Interested
              books={books}
              finishedBooks={finishedBooks}
              toggleFinished={toggleFinished}
              interestedBooks={interestedBooks}
              toggleInterested={toggleInterested}
              readBooks={readBooks}
              navigate={navigate}
          />
        }
      />
      <Route
        path="/reader"
        element={
          readingBooks ? (
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
            <p>read some books~</p>
          )
        }
      />
      <Route
        path="/reading"
        element={
          readingList.length>0 ? (
          <Reading
              books={books}
              finishedBooks={finishedBooks}
              toggleFinished={toggleFinished}
              interestedBooks={interestedBooks}
              toggleInterested={toggleInterested}
              readBooks={readBooks}
              navigate={navigate}
              togglereadingList={togglereadingList}
              readingList= {readingList}
          />
          ):(
            <p>read some books~!</p>
          )
        }
      />
      <Route path="/finished"
        element={
          finishedBooks.length > 0 ? (
            <Finished
              books={books}
              finishedBooks={finishedBooks}
              toggleFinished={toggleFinished}
              interestedBooks={interestedBooks}
              toggleInterested={toggleInterested}
              readBooks={readBooks}
              navigate={navigate}
            />
      ):(
        <p> mark some books as finished~ </p>
      )}
      />
    </Routes>

  </div>
)};
export default App;