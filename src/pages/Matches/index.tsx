import { useEffect, useState } from "react";
import { getMatches } from "../../utils/FetchRequest.ts";
import MatchCards from "./MatchCards.tsx";
import { Match } from "../../types/types.ts";
import {LoadingScreen} from "../../components/LoadingScreen.tsx";

function MatchComponent() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const FetchMatches = async () => {
      const res = await getMatches();
      setMatches(res.matches);
    };
    FetchMatches();
  }, []);

  const sortMatchesBasedOnTime = (matches: Match[]) => {
    return matches.sort((a, b) => {
      return new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime();
    });
  };

  if (matches.length === 0) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  } else {
    return (
      <div>
        <MatchCards matches={sortMatchesBasedOnTime(matches)} />
      </div>
    );
  }
}

export default MatchComponent;
