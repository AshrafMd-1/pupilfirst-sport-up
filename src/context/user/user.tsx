import React, { createContext, useEffect, useState } from "react";
import { User } from "../../types/auth.ts";
import { getUser } from "../../utils/FetchRequest.ts";

export type UserContextProps = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
});

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUser();
        setCurrentUser(userData as User);
      } catch (error) {
        console.error(error);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
