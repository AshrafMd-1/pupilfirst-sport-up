import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/theme.tsx";
import FilterSelection from "./FilterSelection.tsx";
import { sendPreferences } from "../../utils/FetchRequest.ts";

export default function Preferences(props: {
  sports: string[];
  teams: string[];
  selectedSports: string[];
  selectedTeams: string[];
  setSelectedSports: (filter: string[]) => void;
  setSelectedTeams: (filter: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [selectedSports, setSelectedSports] = useState(props.selectedSports);
  const [selectedTeams, setSelectedTeams] = useState(props.selectedTeams);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedSports(props.selectedSports);
    setSelectedTeams(props.selectedTeams);
  }, [props.selectedSports, props.selectedTeams]);

  const setSportsFilter = (filter: string) => {
    if (selectedSports.includes(filter)) {
      setSelectedSports(selectedSports.filter((sport) => sport !== filter));
    } else if (filter === "") {
      setSelectedSports([]);
    } else {
      setSelectedSports([...selectedSports, filter]);
    }
  };

  const setTeamsFilter = (filter: string) => {
    if (selectedTeams.includes(filter)) {
      setSelectedTeams(selectedTeams.filter((team) => team !== filter));
    } else if (filter === "") {
      setSelectedTeams([]);
    } else {
      setSelectedTeams([...selectedTeams, filter]);
    }
  };

  function closeModal() {
    setSelectedTeams(props.selectedTeams);
    setSelectedSports(props.selectedSports);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const savePreferences = async () => {
    props.setSelectedSports(selectedSports);
    props.setSelectedTeams(selectedTeams);
    setIsLoading(true);
    const preferences = {
      preferences: {
        sports: selectedSports,
        teams: selectedTeams,
      },
    };
    await sendPreferences(preferences);
    setIsLoading(false);
    closeModal();
  };

  return (
    <div className="absolute right-0 mr-5 xl:mr-10">
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="bg-black/20 px-4 py-2 border-2 rounded-btn text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Preferences
        </button>
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
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 backdrop-blur overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-6 text-center">
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
                  data-theme={theme}
                  className="w-full max-w-xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div className="flex items-center justify-center">
                    <FilterSelection
                      filterData={props.sports}
                      title="Filter By Sports"
                      setFilterCB={setSportsFilter}
                      selectedData={selectedSports}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <FilterSelection
                      filterData={props.teams}
                      title="Filter By Teams"
                      setFilterCB={setTeamsFilter}
                      selectedData={selectedTeams}
                    />
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <button className="btn btn-error" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={savePreferences}
                    >
                      {isLoading ? (
                        <span className="loading loading-dots loading-xs"></span>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
