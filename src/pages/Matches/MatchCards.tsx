import { Match } from "../../types/auth.ts";
import MatchCard from "./MatchCard.tsx";

function MatchCards(props: { matches: Match[] }) {
  return (
    <div className="mx-12">
      <h1 className="text-3xl font-bold text-center text-gray-900">Matches</h1>
      <div className="flex gap-3 w-full mt-5 mx-5 p-3 overflow-auto">
        {props.matches.map((match) => {
          return (
            <div key={match.id}>
              <MatchCard match={match} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MatchCards;
