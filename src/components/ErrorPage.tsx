import { useNavigate } from "react-router-dom";

export const ErrorPage = (props: {
  status: string;
  message: string;
  description: string;
}) => {
  const nav = useNavigate();
  return (
    <div className="bg-gradient-to-r from-purple-300 to-blue-200">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white  shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-9xl mx-auto font-bold text-purple-400">
              {props.status}
            </h1>
            <h1 className="text-6xl px-4 font-medium py-8">{props.message}</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              {props.description}
            </p>
            <button
              className="bg-gradient-to-r mx-auto from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
              onClick={() => nav("/")}
            >
              Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};