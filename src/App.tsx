import { useState } from "react";
import { Button } from "./components/atoms/Button";
import { Text } from "./components/atoms/Text";
import { Departure, Return } from "./ui/DateField";
import { Modal } from "./ui/Modal";
import { Top } from "./ui/Top";
import { WayToggle } from "./ui/WayToggle";
import { clearParams } from "./hooks/useQueryState";

function App() {
  const [data, setData] = useState<Record<string, FormDataEntryValue>>();

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <Top />
      <div className="container mx-auto flex flex-grow justify-center items-center w-full py-6">
        <div className="max-w-xl">
          <form
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.target as HTMLFormElement);

              setData(Object.fromEntries(data));
            }}
            className="flex flex-col gap-5"
          >
            <WayToggle />
            <Departure />
            <Return />
            <Button type="submit" flavour="success">
              Select destination...
            </Button>
          </form>
        </div>
      </div>
      <Modal open={Boolean(data)}>
        {data && (
          <>
            <div className="flex flex-col gap-3 pb-5">
              <Text className="text-3xl" center>
                ✈️
              </Text>
              {Object.entries(data).map(([key, value]) => (
                <Text className="flex gap-2" key={key}>
                  <Text className="capitalize" as="span" bold>
                    {key}:
                  </Text>
                  <Text as="span">{value.toString()}</Text>
                </Text>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => {
                  setData(undefined);
                  clearParams();
                }}
              >
                Reset
              </Button>
              <Button onClick={() => setData(undefined)}>Close</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default App;
