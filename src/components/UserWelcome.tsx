import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user/user.tsx";
import { dayNightEmoji } from "../utils/UtilityFunctions.ts";

export default function UserWelcome() {
  const userData = useContext(UserContext);
  const [time, setTime] = useState(new Date().toString().slice(15, 21));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toString().slice(15, 21));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl px-5 py-2">
      <h1 className="text-4xl my-3">
        <span>Welcome back,</span>
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
            {new Date().toString().slice(0, 15)}
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
