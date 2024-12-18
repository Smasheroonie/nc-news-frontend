import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../context/User";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [login, setLogin] = useState("");

  useEffect(() => {
    setLogin("");
  }, [user]);

  const handleChange = ({ target: { value } }) => {
    setLogin(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setUser(login);
  };

  return (
    <header className="sticky top-0 bg-inherit p-4 font-bold text-3xl border-b border-black flex flex-row justify-between">
      <Link to={"/"}>NC News</Link>
      <div>
        <label className="text-base font-normal">
          <input
            placeholder="Enter your username"
            onChange={handleChange}
            value={login}
            className="mr-2 p-0.5"
          />
        </label>
        <button
          type="submit"
          onClick={handleClick}
          className="text-base font-normal bg-blue-300 rounded-lg p-0.5 hover:bg-blue-400 active:bg-blue-200 hover:transition-colors ease-in-out duration-200"
        >
          Log In
        </button>
      </div>
    </header>
  );
}
