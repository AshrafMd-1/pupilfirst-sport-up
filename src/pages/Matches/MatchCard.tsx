import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { getMatchDetail } from "../../utils/FetchRequest.ts";
import {
  TimeRemaining,
  TimeRemainingFormatted,
} from "../../utils/UtilityFunctions.ts";
import { LoadingScreen } from "../../components/LoadingScreen.tsx";
import { Match, MatchDetail } from "../../types/data.ts";
import { ThemeContext } from "../../context/theme.tsx";

export default function MatchCard(props: { match: Match }) {
  const [isOpen, setIsOpen] = useState(false);
  const [matchData, setMatchData] = useState<MatchDetail>();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useContext(ThemeContext);

  const fetchMatchDetail = async () => {
    setIsLoaded(true);
    const res = await getMatchDetail(props.match.id);
    setIsLoaded(false);
    setMatchData(res);
  };

  useEffect(() => {
    fetchMatchDetail();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div className="inset-0 flex gap-2 items-center justify-center">
        <div
          className="cursor-pointer man-w-fit rounded-xl flex flex-row-reverse items-center  justify-evenly border-2  p-8 shadow-xl transition hover:border-black-500/10 hover:shadow-pink-500/10"
          style={{ width: "30rem", height: "10.5rem" }}
        >
          <button
            onClick={fetchMatchDetail}
            className="bg-gray-800 mb-auto text-white px-2 py-1 rounded-lg"
          >
            {isLoaded ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Refresh"
            )}
          </button>
          <div onClick={openModal}>
            <div className="flex justify-start flex-col items-start">
              <div className="flex justify-evenly gap-2 items-center">
                <h2 className="text-lg">{props.match.name.split("VS")[0]}</h2>
                <h1 className="text-md font-bold ">VS</h1>
                <h2 className="text-lg ">
                  {props.match.name.split("VS")[1].split("at")[0].trim()}
                </h2>
              </div>
              <div className="flex gap-2 my-1 items-center">
                {TimeRemaining(props.match.endsAt) === -1 ? (
                  <div className="badge badge-error gap-2">Ended</div>
                ) : (
                  <div className="badge badge-success gap-2">Live</div>
                )}
                <div className="badge badge-primary gap-2">
                  {props.match.sportName}
                </div>
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center">
                <h1 className="font-bold">📌</h1>
                <p className="ml-2 text-sm">{props.match.location}</p>
              </div>
            </div>
            <div>
              {matchData ? (
                <div
                  className={`flex gap-2 items-center ${
                    TimeRemaining(props.match.endsAt) === -1 && "hidden"
                  }`}
                >
                  <p>⚽</p>
                  <p className="text-lg font-bold">
                    {
                      matchData.teams.find(
                        (team) => team.id === matchData.playingTeam,
                      )?.name
                    }
                  </p>
                </div>
              ) : (
                <span className="loading loading-bars loading-sm"></span>
              )}
            </div>

            <div>
              {matchData ? (
                <div className="flex justify-evenly items-center gap-3">
                  <div className="flex gap-2 items-center">
                    <p
                      className={`${
                        matchData.score[matchData.teams[0].name] >
                        matchData.score[matchData.teams[1].name]
                          ? "text-green-500"
                          : "text-red-500"
                      } ${
                        matchData.teams.find(
                          (team) => team.id === matchData.playingTeam,
                        )?.name === matchData.teams[0].name &&
                        TimeRemaining(props.match.endsAt) !== -1
                          ? "font-bold"
                          : ""
                      } `}
                    >
                      {matchData.teams[0].name} :{" "}
                      {matchData.score[matchData.teams[0].name]}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p
                      className={`${
                        matchData.score[matchData.teams[0].name] <
                        matchData.score[matchData.teams[1].name]
                          ? "text-green-500"
                          : "text-red-500"
                      }${
                        matchData.teams.find(
                          (team) => team.id === matchData.playingTeam,
                        )?.name === matchData.teams[1].name &&
                        TimeRemaining(props.match.endsAt) !== -1
                          ? "font-bold"
                          : ""
                      } `}
                    >
                      {matchData.teams[1].name} :{" "}
                      {matchData.score[matchData.teams[1].name]}
                    </p>
                  </div>
                </div>
              ) : (
                <span className="loading loading-bars loading-sm"></span>
              )}
            </div>
            {}
            <div className="flex flex-row">
              <dt className="text-md font-medium">Ends At :</dt>
              {TimeRemaining(props.match.endsAt) === -1 ? (
                <dd className="text-md font-bold ml-1">Ended</dd>
              ) : (
                <dd className="text-md font-bold ml-1">
                  {TimeRemainingFormatted(props.match.endsAt)}
                </dd>
              )}
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed backdrop-blur inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  data-theme={theme.theme}
                  className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                >
                  {matchData ? (
                    <>
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                          <div className="flex justify-evenly gap-2 items-center">
                            <h2 className="text-lg font-bold ">
                              {props.match.name.split("VS")[0]}
                            </h2>
                            <h1 className="text-md font-bold ">VS</h1>
                            <h2 className="text-lg font-bold ">
                              {props.match.name
                                .split("VS")[1]
                                .split("at")[0]
                                .trim()}
                            </h2>
                            <button
                              onClick={fetchMatchDetail}
                              className="bg-gray-800 text-white px-2 py-1 rounded-lg"
                            >
                              {isLoaded ? (
                                <span className="loading loading-dots loading-md"></span>
                              ) : (
                                "Refresh"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-md font-bold">Location:</h1>
                        <p className="ml-2 text-md">{props.match.location}</p>
                      </div>
                      <div
                        className={`flex gap-2 items-center ${
                          TimeRemaining(props.match.endsAt) === -1 && "hidden"
                        }`}
                      >
                        <p>Now Playing: </p>
                        <p className="text-lg font-bold">
                          {
                            matchData.teams.find(
                              (team) => team.id === matchData.playingTeam,
                            )?.name
                          }
                        </p>
                      </div>
                      <div className="mt-4">
                        <h1 className="text-md font-bold">Score:</h1>
                        <div>
                          <p
                            className={`${
                              matchData.score[matchData.teams[0].name] >
                              matchData.score[matchData.teams[1].name]
                                ? "text-green-500"
                                : "text-red-500"
                            } `}
                          >
                            {matchData.teams[0].name} :{" "}
                            {matchData.score[matchData.teams[0].name]}
                          </p>
                          <p
                            className={`${
                              matchData.score[matchData.teams[0].name] >
                              matchData.score[matchData.teams[1].name]
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {matchData.teams[1].name} :
                            {matchData.score[matchData.teams[1].name]}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className=" text-md  ">{matchData.story}</p>
                      </div>

                      <dl className="mt-6 flex text-center justify-evenly gap-4 sm:gap-6">
                        <div className="flex flex-col-reverse">
                          <dt className="text-md font-medium">Starts At</dt>
                          {TimeRemaining(matchData.startsAt) === -1 ? (
                            <dd className="text-md">Started</dd>
                          ) : (
                            <dd className="text-md">
                              {TimeRemainingFormatted(matchData.startsAt)}
                            </dd>
                          )}
                        </div>
                        <div className="flex flex-col-reverse">
                          <dt className="text-md font-medium">Ends At</dt>
                          {TimeRemaining(matchData.endsAt) === -1 ? (
                            <dd className="text-md">Ended</dd>
                          ) : (
                            <dd className="text-md">
                              {TimeRemainingFormatted(matchData.endsAt)}
                            </dd>
                          )}
                        </div>

                        <div className="flex text-center flex-col-reverse">
                          <dt className="text-md font-medium ">Sport</dt>
                          <dd className="text-md">{matchData.sportName}</dd>
                        </div>
                      </dl>
                    </>
                  ) : (
                    <div>
                      <LoadingScreen />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
