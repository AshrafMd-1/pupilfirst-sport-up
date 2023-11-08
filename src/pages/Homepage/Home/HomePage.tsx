import backgroundImg from "../../../assets/images/background.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="hero min-h-screen "
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="hero-overlay bg-black  bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl text-white font-bold">SportUp</h1>
          <p className="mb-5 text-white text-2xl">
            SportUp revolutionizes the way you keep score in sports events with
            its intuitive score board feature. Whether you're at a little league
            game, a weekend pickup match, or a competitive tournament, SportUp
            helps you track scores effortlessly. Stay in control, enjoy the
            game, and elevate your sporting experience with SportUp. Get started
            today!
          </p>
          <div className="flex space-x-4 justify-center items-center border-t-2 border-white pt-4 ">
            <Link
              className="btn font-bold tracking-wider border-2 border-white text-white bg-transparent py-4 px-6 text-center no-underline  mt-3 transition-all duration-500 ease-in-out rounded-3xl hover:bg-white hover:text-black"
              to={"/signup"}
            >
              Get Started
            </Link>
            <Link
              className="btn font-bold tracking-wider border-2 border-white text-white bg-transparent py-4 px-6 text-center no-underline mt-3 transition-all duration-500 ease-in-out rounded-3xl hover:bg-white hover:text-black "
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="btn font-bold tracking-wider border-2 border-white text-white bg-transparent py-4 px-6 text-center no-underline mt-3 transition-all duration-500 ease-in-out rounded-3xl hover:bg-white hover:text-black "
              to={"/dashboard"}
            >
              Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
