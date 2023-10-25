import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function FilterSelection(props: {
  filterData: string[];
  title: string;
  setFilterCB: (filter: string) => void;
  selectedData: string[];
}) {
  return (
    <div className="w-full ">
      <div className=" w-full  rounded-2xl bg-white p-2">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{props.title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 flex  items-center text-sm text-gray-500 overflow-auto">
                {props.filterData.map((data, idx) => {
                  return (
                    <div key={idx} className="mx-2">
                      <button
                        key={idx}
                        className={` m-2 border-2  text-blue-500 font-bold py-2 px-4 rounded-full ${
                          props.selectedData.includes(data)
                            ? "bg-blue-500 text-white"
                            : "border-blue-500 text-blue-500"
                        } hover:text-white hover:bg-blue-500`}
                        onClick={() => props.setFilterCB(data)}
                      >
                        {data}
                      </button>
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
