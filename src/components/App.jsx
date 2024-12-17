import { Route, Routes } from "react-router";
import Articles from "./Articles";
import SingleArticle from "./SingleArticle";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <main className="bg-neutral-100">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="articles/:article_id" element={<SingleArticle />} />
      </Routes>

      <footer className="font-semibold static">All rights reserved.</footer>
    </main>
  );
}

export default App;
