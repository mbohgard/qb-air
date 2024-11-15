import { useState } from "react";
import { Button } from "./components/atoms/Button";
import { Departure, Return } from "./ui/DateField";
import { Top } from "./ui/Top";
import { WayToggle } from "./ui/WayToggle";
import { clearParams } from "./hooks/useQueryState";
import { SubmitModal } from "./ui/SubmitModal";

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
              const formData = new FormData(e.target as HTMLFormElement);

              setData(Object.fromEntries(formData));
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
      <SubmitModal
        data={data}
        onReset={() => {
          setData(undefined);
          clearParams();
        }}
        onClose={() => setData(undefined)}
      />
    </div>
  );
}

export default App;
