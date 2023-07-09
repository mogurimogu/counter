import { useState } from "react";
import { Button } from "@chakra-ui/react";
import moment from "moment";
import "./App.css";
import Counter from "./components/Counter";

function App() {
  const [counters, setCounters] = useState(
    JSON.parse(localStorage.getItem("counters")) || []
  );

  const handleUpdate = (event) => {
    const { name, count, id } = event;
    const elementToEdit = counters.find((elemento) => {
      return elemento.id === id;
    });
    if (elementToEdit) {
      const updatedCounters = counters.map((counter) => {
        if (counter.id === id) {
          return {
            ...counter,
            name: name || counter.name,
            count: count || counter.count,
          };
        }
        return counter;
      });
      setCounters(updatedCounters);
      localStorage.setItem("counters", JSON.stringify(counters));
    }
  };

  const handleDelete = (id) => {
    const updatedCounters = counters.filter((counter) => counter.id !== id);
    if (confirm("This counter will be deleted, are you sure?")) {
      setCounters(updatedCounters);
      localStorage.setItem("counters", JSON.stringify(updatedCounters));
    }
  };

  const handleNewCounter = () => {
    setCounters([
      ...counters,
      {
        id: Date.now(),
        created: moment().format("HH:mm - DD/MM/YYYY"),
      },
    ]);
  };

  return (
    <div className="min-h-screen min-w-[100vw] p-3">
      {counters.length > 0 ? (
        <div className="grid gap-3 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
          {counters.map((counter) => (
            <Counter
              key={counter.id}
              id={counter.id}
              name={counter.name || counter.id}
              count={counter.count || 0}
              created={counter.created}
              updateCounter={(event) => handleUpdate(event)}
              deleteCounter={(event) => handleDelete(event)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-200 text-slate-400 p-10 text-center rounded-xl text-xl font-semibold">
          There are no counters
        </div>
      )}
      <div className="text-center m-3">
        <Button onClick={handleNewCounter} className="!bg-emerald-300 hover:!bg-emerald-100">
          Create a new counter 🧮
        </Button>
      </div>
    </div>
  );
}

export default App;
