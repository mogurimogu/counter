/* eslint-disable react/prop-types */
import { Button, FormControl, Input } from "@chakra-ui/react";
import moment from "moment/moment";
import { useEffect, useState } from "react";

function Counter(props) {
  const { updateCounter, deleteCounter } = props;

  const [id, setId] = useState(props.id || Date.now);
  const [name, setName] = useState(props.name || "");
  const [created, setCreated] = useState(props.created || "");
  const [count, setCount] = useState(props.count || 0);

  useEffect(() => {
    const updateChanges = setTimeout(() => {
      setName(name);
      setCount(count);
      updateCounter({ name, count, id });
    }, 600);
    !created && setCreated(moment().format("HH:mm - DD/MM/YYYY"));

    return () => clearTimeout(updateChanges);
  }, [count, created, id, name, updateCounter]);

  return (
    <div className="shadow rounded-lg p-3">
      <FormControl className="grid grid-cols-6 gap-3 mb-3">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="col-span-5 text-center"
        />
        <Button
          className="col-span-1 !bg-red-700 hover:!bg-red-600"
          onClick={() => deleteCounter(id)}
        >
          🗑️
        </Button>
        <Button
          className="col-span-1"
          onClick={() => count !== 0 && setCount((count) => count - 1)}
        >
          ➖
        </Button>
        <Input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          min={0}
          className="col-span-4 text-center"
        />
        <Button
          className="col-span-1"
          onClick={() => setCount((count) => count + 1)}
        >
          ➕
        </Button>
      </FormControl>
      <div className="text-right text-gray-300">
        <span>{created}</span>
      </div>
    </div>
  );
}

export default Counter;
