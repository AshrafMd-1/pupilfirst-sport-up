import Navbar from "./Navbar.tsx";
import ArticleComponent from "../../Articles";
import MatchComponent from "../../Matches";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <MatchComponent />
      <hr className="border-4 my-4 w-full rounded-2xl" />
      <ArticleComponent />
    </div>
  );
}

export default Dashboard;
