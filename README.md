# 📚 Bookly

**Your personal digital bookshelf.**

Bookly is a React-based book discovery and reading tracker that lets users explore books, save titles they're interested in, keep track of what they're currently reading, and mark books as finished.

The project was built to practise React fundamentals, component-based development, state management, API integration, and client-side routing.

## ✨ Features

- **Explore Books:** Browse a collection of English books fetched from the Gutendex API.
- **Search:** Find books by title using the search bar.
- **Interested List:** Save books you want to read using the heart button.
- **Currently Reading:** Keep track of books you've started reading.
- **Finished Books:** Mark books as completed and organise your reading progress.
- **Read Here:** Open a reading view that searches for the selected book through Internet Archive.
- **Dark Mode:** Switch between light and dark themes.
- **Responsive Navigation:** Navigate between different sections using the sidebar.

## 🛠️ Built With

- React
- JavaScript
- Vite
- React Router
- HTML5
- CSS3

## 🌐 APIs Used

- [Gutendex API](https://gutendex.com/) for fetching book information and catalogue data.
- [Internet Archive](https://archive.org/) for searching for available reading copies.

**Note:** Reading availability depends on whether a matching book can be found on Internet Archive.

## 🚀 Getting Started

To run Bookly locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/supriya-sh/Bookly.git
   ```

2. Navigate into the project folder:

   ```bash
   cd Bookly
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

## 📖 What I Learned

Building Bookly helped me practise:

- Managing component state with `useState`.
- Working with React props and reusable components.
- Fetching API data using `fetch`, `async/await`, and `useEffect`.
- Handling loading and error states.
- Implementing navigation with React Router.
- Filtering and organising data using JavaScript array methods.
- Creating interactive UI elements and managing their state.

## 🔮 Future Improvements

- Save reading lists across page refreshes using local storage.
- Improve book search and reading availability.
- Add reading progress tracking.
- Introduce bookmarks and reading preferences.

---

**Made with ♡ by Supriya**
