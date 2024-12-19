import { useEffect, useState } from "react";
import { patchVotes } from "../../utils/api";
import { GoThumbsup } from "react-icons/go";

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
    <div className="flex flex-row gap-2">
      {error ? <p className="text-red-600">{error}</p> : null}
      <button onClick={handleVote}>
        <GoThumbsup
          className={
            !voted
              ? "size-8 hover:fill-green-600 active:fill-green-400"
              : "size-8 fill-green-600 active:fill-green-400"
          }
        />
      </button>
      <p>
        Votes: <span className="font-semibold">{votesCount}</span>
      </p>
    </div>
  );
}
