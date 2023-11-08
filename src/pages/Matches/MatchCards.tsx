import MatchCard from "./MatchCard.tsx";
import { Match } from "../../types/data.ts";

function MatchCards(props: { matches: Match[] }) {
  return (
    <div className="mx-12">
      <h1 className="text-3xl font-bold text-center">Matches</h1>
      <div className=" mt-3 carousel-center max-w-full overflow-auto p-4 space-x-4 rounded-box">
        <div className="carousel-item">
          {props.matches.map((match) => {
            return (
              <div key={match.id} className="mx-2">
                <MatchCard match={match} />
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
}

export default MatchCards;
