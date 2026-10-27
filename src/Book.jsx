import "./App.css";
function Book({ readingBooks, loadingBook, storyText, onBack }) {
  return (
    <section className="reader">
      <button className="readbutt" onClick={onBack}>
        ←
      </button>
      <h2 className="titleofbook">{readingBooks.title}</h2>
      {loadingBook && <p>book is loading~~</p>}
      {storyText && <p>{storyText}</p>}
      {readingBooks.archiveId && !loadingBook && (
        <iframe
          src={`https://archive.org/embed/${readingBooks.archiveId}`}
          title={`Reading ${readingBooks.title}`}
          width="100%"
          height="700"
          style={{ border: "none" }}
          allowFullScreen
        />
      )}
    </section>
  );
}
export default Book;
