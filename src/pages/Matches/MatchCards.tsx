import MatchCard from "./MatchCard.tsx";
import { Match } from "../../types/data.ts";
import { useTranslation } from "react-i18next";

function MatchCards(props: { matches: Match[] }) {
  const { t } = useTranslation();
  return (
    <div className="mx-12">
      <h1 className="text-3xl font-bold text-center">{t("Matches")}</h1>
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
