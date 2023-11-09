import { useEffect, useState } from "react";
import { changePassword } from "../../utils/FetchRequest.ts";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nav = useNavigate();

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
  }, [currentUser]);

  const handleSubmit = async () => {
    const formPasswords = {
      current_password: formData.currentPassword,
      new_password: formData.newPassword,
    };

    try {
      setIsLoading(true);
      const res = await changePassword(formPasswords);
      if (res.status === "error") {
        setErrors(res.message);
        setIsLoading(false);
        return;
      } else {
        nav("/account");
        setErrors("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center">
      <label className=" text-xl ml-1 font-bold m-2" htmlFor="oldPassword">
        Old Password
      </label>
      <input
        className="border bg-white border-gray-400 rounded-lg p-2"
        type="password"
        name="oldPassword"
        id="oldPassword"
        value={formData.currentPassword}
        placeholder="Current Password"
        onChange={(e) =>
          setFormData({ ...formData, currentPassword: e.target.value })
        }
      />
      <label className="text-xl ml-1 font-bold m-2" htmlFor="newPassword">
        New Password
      </label>
      <input
        className="border bg-white border-gray-400 rounded-lg p-2"
        type="password"
        name="password"
        id="password"
        value={formData.newPassword}
        placeholder="New Password"
        onChange={(e) =>
          setFormData({ ...formData, newPassword: e.target.value })
        }
      />
      {
        <p className="text-red-500 my-1 text-center font-bold">
          {errors ? errors : ""}
        </p>
      }
      <div className="flex justify-center items-center gap-3">
        <button
          className="btn btn-info rounded-2xl mt-3"
          onClick={() => nav("/account")}
        >
          Account
        </button>
        <button
          className="btn btn-success rounded-2xl mt-3"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Change Password"
          )}
        </button>
      </div>
    </div>
  );
};
