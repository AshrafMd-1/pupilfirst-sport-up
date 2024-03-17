import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user/user.tsx";
import { useTranslation } from "react-i18next";

export const UserDetails = () => {
  const nav = useNavigate();
  const userData = useContext(UserContext);
  const { t } = useTranslation();
  const [currentUser] = useState(() => {
    const user =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    if (user) {
      return user;
    }
    return null;
  });

  useEffect(() => {
    if (!currentUser) {
      nav("/dashboard");
    }
  }, [currentUser, nav]);

  return (
    <div className=" min-w-full h-screen px-5 py-2">
      <h1 className=" text-4xl my-3">
        Here is your profile,
        <span className="pl-2 font-bold">{userData.currentUser?.name}</span>
      </h1>
      <div className="flex gap-2 flex-col border-2  p-3 rounded-lg">
        <div className="grid grid-cols-2 gap-2 border-b ">
          <span className="font-bold ">{t("Name")}</span>
          <span className="font-bold">{userData.currentUser?.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold">{t("Email")}</span>
          <span className="font-bold">{userData.currentUser?.email}</span>
        </div>
      </div>
      <div className="flex mt-5 justify-center items-center gap-3">
        <button className="btn btn-info" onClick={() => nav("/dashboard")}>
          Dashboard
        </button>
        <button
          className="btn btn-warning"
          onClick={() => nav("/change-password")}
        >
          Change {t("Password")}
        </button>
      </div>
    </div>
  );
};
