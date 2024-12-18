import { Route, Routes } from "react-router";
import Articles from "./Articles";
import SingleArticle from "./SingleArticle";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import SidebarNav from "./SidebarNav";

function App() {
  return (
    <main className="bg-neutral-100 h-auto">
      <Header />
      <SidebarNav />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="articles/:article_id" element={<SingleArticle />} />
        <Route path="topics/:topic" element={<Articles />} />
      </Routes>

      <footer className="font-semibold static">All rights reserved.</footer>
    </main>
  );
}

export default App;
