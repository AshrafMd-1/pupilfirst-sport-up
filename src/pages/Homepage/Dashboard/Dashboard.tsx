import Navbar from "./Navbar.tsx";
import ArticleComponent from "../../Articles";
import MatchComponent from "../../Matches";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <MatchComponent />
      <ArticleComponent />
    </div>
  );
}

export default Dashboard;
