import { Link } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 bg-inherit p-4 font-bold text-3xl border-b border-black">
      <Link to={"/"}>NC News</Link>
    </header>
  );
}
