import ErrorBoundary from "../../components/ErrorBoundary.tsx";
import { Suspense } from "react";
import { LoadingScreen } from "../../components/LoadingScreen.tsx";
import Navbar from "../../components/Navbar.tsx";
import { ChangePassword } from "./ChangePassword.tsx";
import { UserProvider } from "../../context/user/user.tsx";

export const ChangePasswordContainer = () => {
  return (
    <UserProvider>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Navbar />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <ChangePassword />
        </Suspense>
      </ErrorBoundary>
    </UserProvider>
  );
};
