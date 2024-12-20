import { Route, Routes } from "react-router";
import Articles from "./Articles";
import SingleArticle from "./SingleArticle";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import SidebarNav from "./SidebarNav";
import ErrorPage from "./ErrorPage";
import NewArticle from "./NewArticle";

function App() {
  return (
    <main className="bg-neutral-100 h-auto font-['Verdana']">
      <Header />
      <SidebarNav />
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Articles />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="articles/:article_id" element={<SingleArticle />} />
        <Route path="topics/:topic" element={<Articles />} />
      </Routes>

      <footer className="border-t border-black font-semibold static m-auto p-2 bg-neutral-100">
        <p>All rights reserved.</p>
      </footer>
    </main>
  );
}

export default App;
