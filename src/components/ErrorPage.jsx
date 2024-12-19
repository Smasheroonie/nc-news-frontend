import { Link } from "react-router";

export default function ErrorPage({status, msg}) {
  return (
    <section className="h-screen content-center">
      <h1 className="flex justify-center text-6xl mt-32">{status || "404"}! Uh oh!</h1>
      <p className="flex justify-center mt-3 text-lg">{msg || "Not found"}</p>
      <p className="flex justify-center mb-96 mt-3 pb-80">
        <Link to={"/articles"} className="text-3xl underline hover:text-blue-500">Take me back home!</Link>
      </p>
    </section>
  );
}
