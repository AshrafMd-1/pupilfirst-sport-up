import ErrorBoundary from "../../components/ErrorBoundary.tsx";
import { Suspense } from "react";
import { LoadingScreen } from "../../components/LoadingScreen.tsx";
import Navbar from "../../components/Navbar.tsx";
import { UserProvider } from "../../context/user/user.tsx";
import { UserDetails } from "./UserDetails.tsx";

export const AccountDetails = () => {
  return (
    <UserProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Navbar />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <UserDetails />
        </Suspense>
      </ErrorBoundary>
    </UserProvider>
  );
};
