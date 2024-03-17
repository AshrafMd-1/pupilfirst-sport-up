import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user/user.tsx";
import { dayNightEmoji } from "../utils/UtilityFunctions.ts";
import { useTranslation } from "react-i18next";

export default function UserWelcome() {
  const date = new Date();
  const {i18n} = useTranslation();

  // Create a date formatter for a specific locale
  const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat(i18n.language, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const userData = useContext(UserContext);
  const [time, setTime] = useState(timeFormatter.format(new Date()).toString());
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeFormatter.format(new Date()).toString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl px-5 py-2">
      <h1 className="text-4xl my-3">
        <span>{t("Welcome")} back,</span>
        <span className="font-bold" style={{ textTransform: "capitalize" }}>
          &nbsp;
          {userData.currentUser?.name ? userData.currentUser?.name : "Guest"}
        </span>
      </h1>
      <div>
        <p className=" text-xl" style={{ textTransform: "capitalize" }}>
          <span>Date :</span>

          <span className=" font-bold" style={{ textTransform: "capitalize" }}>
            &nbsp;
            {dateFormatter.format(date)}
          </span>
        </p>
      </div>
      <div>
        <p
          className=" text-xl flex items-center"
          style={{ textTransform: "capitalize" }}
        >
          <span>Time :</span>
          <span className=" font-bold" style={{ textTransform: "capitalize" }}>
            &nbsp;
            {time}
          </span>
          <span className="text-2xl ml-1">{dayNightEmoji()}</span>
        </p>
      </div>
    </div>
  );
}
