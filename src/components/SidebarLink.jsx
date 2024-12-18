import { Link } from "react-router";

export default function SidebarLink({ text }) {
  return (
    <Link
      to={{ pathname: `/topics/${text}` }}
      className="bg-white flex max-[1710px]:pr-2 max-[1710px]:pb-1 my-0.5 items-center cursor-pointer rounded-lg border border-slate-400 hover:bg-sky-200 hover:text-cyan-950 hover:transition-colors active:bg-sky-100 ease-out duration-300"
    >
      <h2 className="font-bold text-xl my-4 ml-2">{text}</h2>
    </Link>
  );
}
