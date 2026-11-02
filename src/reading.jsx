import "./App.css"
function Reading({
  books,
  finishedBooks,
  toggleFinished,
  readBooks,
  navigate,
  toggleInterested,
  interestedBooks,
  togglereadingList,
  readingList,
}) {
    const readBok= books.filter((book) =>
        readingList.includes(book.id)
    );
    return(
        <div className="appsiee">
      <main className="mainapp">
        <header className="header">Currently Reading...</header>
        <section className="backgroundbookie">
          {readBok.length === 0 ? (
            <p className="status">
              mark some books as finished~
            </p>
          ) : (
            <div className="booklists updated">
              {readBok.map((book) => (
                <article className="rowflow updated" key={book.id}>
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
                        }}
                      >
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
  );
}
export default Reading;