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
      <button
        onClick={handleVote}
        className={
          !voted
            ? "shadow-md bg-gray-300 rounded-full p-1 hover:bg-gray-400 cursor-pointer"
            : "shadow-md bg-green-300 rounded-full p-1 hover:bg-green-400 cursor-pointer"
        }
      >
        Votes: <span className="font-semibold">{votesCount}</span>{" "}
        {!voted ? "+" : "-"}
      </button>
      {error ? <p>{error}</p> : null}
    </>
  );
}
