import ArticleCard from "./ArticleCard.tsx";
import FilterSelection from "./FilterSelection.tsx";
import { Article } from "../../types/data.ts";
import Preferences from "./Preferences.tsx";
import { useContext } from "react";
import { UserContext } from "../../context/user/user.tsx";
import { useTranslation } from "react-i18next";

function ArticleCards(props: {
  articles: Article[];
  sports: string[];
  teams: string[];
  setSportsFilter: (filter: string) => void;
  setTeamsFilter: (filter: string) => void;
  selectedSports: string[];
  selectedTeams: string[];
  setSelectedSports: (filter: string[]) => void;
  setSelectedTeams: (filter: string[]) => void;
}) {
  const userData = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <div className="mx-12">
      <div className="flex items-center ">
        <h1 className="text-3xl font-bold mx-auto">{t("Articles")}</h1>
        {userData?.currentUser?.name && (
          <Preferences
            sports={props.sports}
            teams={props.teams}
            selectedSports={props.selectedSports}
            selectedTeams={props.selectedTeams}
            setSelectedSports={props.setSelectedSports}
            setSelectedTeams={props.setSelectedTeams}
          />
        )}
      </div>
      <div className="flex items-center justify-center">
        <FilterSelection
          filterData={props.sports}
          title="Filter By Sports"
          setFilterCB={props.setSportsFilter}
          selectedData={props.selectedSports}
        />
      </div>
      <div className="flex items-center justify-center">
        <FilterSelection
          filterData={props.teams}
          title="Filter By Teams"
          setFilterCB={props.setTeamsFilter}
          selectedData={props.selectedTeams}
        />
      </div>
      <div>
        {props.articles.map((article) => {
          return (
            <div key={article.id}>
              <ArticleCard article={article} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleCards;
