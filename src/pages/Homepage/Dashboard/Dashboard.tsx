import Navbar from "./Navbar.tsx";
import ArticleComponent from "../../Articles";
import MatchComponent from "../../Matches";
import ErrorBoundary from "../../../components/ErrorBoundary.tsx";
import { Suspense } from "react";
import {LoadingScreen} from "../../../components/LoadingScreen.tsx";

function Dashboard() {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen/>}>
          <Navbar />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen/>}>
          <MatchComponent />
        </Suspense>
      </ErrorBoundary>
      <hr className="border-4 my-4 w-full rounded-2xl" />
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen/>}>
          <ArticleComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default Dashboard;
