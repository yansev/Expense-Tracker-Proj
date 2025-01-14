import React, { useState } from "react";

const SavingsChallenge: React.FC = () => {
  const [challengeAmount, setChallengeAmount] = useState<number>(0);
  const [challengeDuration, setChallengeDuration] = useState<number>(0);

  const calculateChallenge = () => {
    const weeklySaving = challengeAmount / challengeDuration;
    return `To save $${challengeAmount} in ${challengeDuration} weeks, save $${weeklySaving.toFixed(
      2
    )} per week.`;
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Total Challenge Amount"
        value={challengeAmount}
        onChange={(e) => setChallengeAmount(parseFloat(e.target.value))}
      />
      <input
        type="number"
        placeholder="Duration in Weeks"
        value={challengeDuration}
        onChange={(e) => setChallengeDuration(parseInt(e.target.value))}
      />
      <button onClick={() => alert(calculateChallenge())}>
        Start Challenge
      </button>
    </div>
  );
};

export default SavingsChallenge;
