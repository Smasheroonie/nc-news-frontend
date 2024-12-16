import { Route, Routes } from "react-router";
import Articles from "./Articles";
import SingleArticle from "./SingleArticle";
import Header from "./Header";

function App() {
  return (
    <main className="bg-neutral-100">
      <Header />
      <div className="min-h-svh">
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
      <footer className="m-2 font-semibold">All rights reserved.</footer>
    </main>
  );
}

export default App;
