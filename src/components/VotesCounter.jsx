import { useEffect, useState } from "react";
import { patchVotes } from "../../utils/api";

export default function VotesCounter({ votes, articleId }) {
  const [votesCount, setVotesCount] = useState(0);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setVotesCount(votes);
  }, [votes]);

  const handleVote = () => {
    if (!voted) {
      setVotesCount((currVotesCount) => currVotesCount + 1);
      setVoted(true);
      setError(null);
      patchVotes(1, articleId).catch((err) => {
        setVotesCount((currVotesCount) => currVotesCount - 1);
        setError("Vote unsuccessful, try again.");
        setVoted(false);
      });
    } else {
      setVotesCount((currVotesCount) => currVotesCount - 1);
      setVoted(false);
      setError(null);
      patchVotes(-1, articleId).catch((err) => {
        setVotesCount((currVotesCount) => currVotesCount + 1);
        setError("Vote was not removed, try again.");
        setVoted(true);
      });
    }
  };

  return (
    <>
      {error ? <p className="text-red-600">{error}</p> : null}
      <button
        onClick={handleVote}
        className={
          !voted
            ? "min-w-24 shadow-sm bg-gray-300 rounded-xl p-1 hover:bg-green-400 active:bg-green-300 hover:transition-colors ease-in-out duration-200 cursor-pointer"
            : "min-w-24 shadow-sm bg-green-300 rounded-xl p-1 hover:bg-green-400 active:bg-gray-200 hover:transition-colors ease-in-out duration-200 cursor-pointer"
        }
      >
        Votes: <span className="font-semibold">{votesCount}</span>{" "}
        {!voted ? "+" : "-"}
      </button>
    </>
  );
}
