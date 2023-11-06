import { Fragment, useContext, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../context/theme.tsx";

const themes = [
  { name: "light" },
  { name: "dark" },
  { name: "cupcake" },
  { name: "bumblebee" },
  { name: "emerald" },
  { name: "corporate" },
  { name: "synthwave" },
  { name: "halloween" },
  { name: "forest" },
  { name: "aqua" },
  { name: "lofi" },
  { name: "pastel" },
  { name: "fantasy" },
  { name: "wireframe" },
  { name: "black" },
  { name: "luxury" },
  { name: "dracula" },
  { name: "cmyk" },
  { name: "business" },
  { name: "acid" },
  { name: "lemonade" },
  { name: "night" },
  { name: "winter" },
];

export default function ThemeList() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [selected, setSelected] = useState(() => {
    const currentTheme = themes.find((t) => t.name === theme);
    return currentTheme ? currentTheme : themes[0];
  });

  useEffect(() => {
    setTheme(selected.name);
    localStorage.setItem("theme", selected.name);
  }, [selected, setTheme]);

  return (
    <div className="top-16 w-72 z-10">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block text-black truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {themes.map((theme, themeIdx) => (
                <Listbox.Option
                  key={themeIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={theme}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {theme.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
