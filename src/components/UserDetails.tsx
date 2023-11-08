import { useContext } from "react";
import { UserContext } from "../context/user/user.tsx";

export default function UserDetails() {
  const userData = useContext(UserContext);

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
    </div>
  );
}
