import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../context/User";
import NCNlogo from "/src/assets/NCNlogo.png";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [login, setLogin] = useState("");

  useEffect(() => {
    setLogin("");
  }, [user]);

  const handleChange = ({ target: { value } }) => {
    setLogin(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(login);
  };

  return (
    <header className="sticky top-0 bg-inherit p-3 px-2 border-b border-black flex flex-row justify-between">
      <div className="flex flex-row justify-center items-center">
        <Link to="/articles">
          <img src={NCNlogo} alt="NCN logo" className="sm:size-14 w-24" />
        </Link>
        <div className="mx-2 w-40 text-sm">
          <p>"Modern news, delivered responsively"</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        value={login}
        className="content-center flex flex-col sm:block"
      >
        <label className="text-base font-normal">
          {user ? (
            <span className="text-sm sm:text-base">Logged in as {user} </span>
          ) : (
            <input
              id="login-input"
              placeholder="Enter your username"
              onChange={handleChange}
              value={login}
              className="rounded-lg p-0.5 sm:w-48 w-[9.8rem] border border-blue-200 text-sm sm:text-base mb-2 sm:mr-2"
            />
          )}
        </label>
        {user ? (
          <button
            type="submit"
            className="text-base m-auto font-normal bg-blue-300 rounded-lg sm:p-0.5 hover:bg-blue-400 active:bg-blue-200 hover:transition-colors ease-in-out duration-200 p-2"
          >
            Log Out
          </button>
        ) : (
          <button
            type="submit"
            className="text-base m-auto font-normal bg-blue-300 rounded-lg sm:p-0.5 hover:bg-blue-400 active:bg-blue-200 hover:transition-colors ease-in-out duration-200 p-2"
          >
            Log In
          </button>
        )}
      </form>
    </header>
  );
}
