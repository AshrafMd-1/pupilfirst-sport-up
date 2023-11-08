import { useContext, useEffect, useState } from "react";
import { getArticles } from "../../utils/FetchRequest.ts";
import ArticleCards from "./ArticleCards.tsx";
import { LoadingScreen } from "../../components/LoadingScreen.tsx";
import { Article } from "../../types/data.ts";
import { UserContext } from "../../context/user/user.tsx";

function ArticleComponent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sports, setSports] = useState<string[]>([]);
  const [teams, setTeams] = useState<string[]>([]);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const userData = useContext(UserContext);

  useEffect(() => {
    if (
      userData?.currentUser?.preferences.sports &&
      userData?.currentUser?.preferences.teams
    ) {
      setSelectedSports(userData.currentUser.preferences.sports);
      setSelectedTeams(userData.currentUser.preferences.teams);
    }
  }, [userData]);

  const setSportsFilter = (filter: string) => {
    if (selectedSports.includes(filter)) {
      setSelectedSports(selectedSports.filter((sport) => sport !== filter));
    } else if (filter === "") {
      setSelectedSports([]);
    } else {
      setSelectedSports([...selectedSports, filter]);
    }
  };

  const setTeamsFilter = (filter: string) => {
    if (selectedTeams.includes(filter)) {
      setSelectedTeams(selectedTeams.filter((team) => team !== filter));
    } else if (filter === "") {
      setSelectedTeams([]);
    } else {
      setSelectedTeams([...selectedTeams, filter]);
    }
  };

  const sortArticlesBasedOnSports = (articles: Article[]) => {
    if (selectedSports.length === 0) {
      return articles;
    } else {
      return articles.filter((article) => {
        return selectedSports.includes(article.sport.name);
      });
    }
  };

  const sortArticlesBasedOnTeams = (articles: Article[]) => {
    if (selectedTeams.length === 0) {
      return articles;
    } else {
      return articles.filter((article) => {
        if (article.teams.length === 0) {
          return false;
        }
        if (article.teams.length === 1) {
          return selectedTeams.includes(article.teams[0].name);
        }
        return (
          selectedTeams.includes(article.teams[0].name) ||
          selectedTeams.includes(article.teams[1].name)
        );
      });
    }
  };

  const sortArticles = (articles: Article[]) => {
    return sortArticlesBasedOnTeams(sortArticlesBasedOnSports(articles));
  };

  const setData = (data: Article[]) => {
    const { uniqueSports, uniqueTeams } = data.reduce(
      (acc, article) => {
        acc.uniqueSports.add(article.sport.name);

        article.teams.forEach((team) => {
          acc.uniqueTeams.add(team.name);
        });

        return acc;
      },
      {
        uniqueSports: new Set<string>(),
        uniqueTeams: new Set<string>(),
      },
    );

    const sports = Array.from(uniqueSports);
    const teams = Array.from(uniqueTeams);

    setArticles(data);
    setSports(sports);
    setTeams(teams);
  };

  useEffect(() => {
    const FetchArticles = async () => {
      const res = await getArticles();
      setData(res);
    };
    FetchArticles();
  }, []);

  if (articles.length === 0) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  } else {
    return (
      <div className="p-2">
        <ArticleCards
          articles={sortArticles(articles)}
          sports={sports}
          teams={teams}
          setSportsFilter={setSportsFilter}
          setTeamsFilter={setTeamsFilter}
          selectedSports={selectedSports}
          selectedTeams={selectedTeams}
          setSelectedSports={setSelectedSports}
          setSelectedTeams={setSelectedTeams}
        />
      </div>
    );
  }
}

export default ArticleComponent;
