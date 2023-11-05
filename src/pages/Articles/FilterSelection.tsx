export default function FilterSelection(props: {
  filterData: string[];
  title: string;
  setFilterCB: (filter: string) => void;
  selectedData: string[];
}) {
  return (
    <div className="collapse border rounded-xl m-3 collapse-arrow bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{props.title}</div>
      <div className="collapse-content flex flex-col">
        <button
          className="btn mb-4  btn-outline btn-primary btn-sm"
          onClick={() => {
            props.setFilterCB("");
          }}
        >
          ❌ Clear Filter
        </button>

        <div
          className={`flex flex-wrap justify-center ${
            props.filterData.length > 5 ? "h-48" : ""
          } overflow-auto`}
        >
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
        </div>
      </div>
    </div>
  );
}
