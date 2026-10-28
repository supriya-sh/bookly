function Interested({
  books,
  interestedBooks,
  toggleInterested,
  readBooks,
  navigate,
}) {
  const savedBooks = books.filter((book) =>
    interestedBooks.includes(book.id)
  );
  return (
    <div className="appsiee">
      <main className="mainapp">
        <header className="header">Interested in...</header>

        <section className="backgroundbookie">
          {savedBooks.length === 0 ? (
            <p className="status">
              heart some books~ ♡
            </p>
          ) : (
            <div className="booklists">
              {savedBooks.map((book) => (
                <article className="rowflow" key={book.id}>
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
                    <button
                      type="button"
                      className="heartbutt hearted"
                      onClick={() => toggleInterested(book.id)}
                    >
                      ♥
                    </button>
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
export default Interested;