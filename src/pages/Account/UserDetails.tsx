import { useNavigate } from "react-router-dom";

export const UserDetails = () => {
  const nav = useNavigate();
  return (
    <div className=" min-w-full h-screen px-5 py-2">
      <h1 className=" text-4xl my-3">
        Here is your profile,
        <span className="pl-2 font-bold">John Doe</span>
      </h1>
      <div className="flex gap-2 flex-col border-2  p-3 rounded-lg">
        <div className="grid grid-cols-2 gap-2 border-b ">
          <span className="font-bold ">Name</span>
          <span className="font-bold">John Doe</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <span className="font-bold">Email</span>
          <span className="font-bold">ashraf@gmail.com</span>
        </div>
      </div>
      <div className="flex mt-5 justify-center items-center gap-3">
        <button className="btn btn-info" onClick={() => nav("/dashboard")}>
          Dashboard
        </button>
      </div>
    </div>
  );
};
