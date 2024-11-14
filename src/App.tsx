import { Button } from "./components/atoms/Button";
import { Departure, Return } from "./ui/DateField";
import { Top } from "./ui/Top";
import { WayToggle } from "./ui/WayToggle";

function App() {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <Top />
      <div className="container mx-auto flex flex-grow justify-center items-center w-full">
        <div className="max-w-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("submit", e.target);
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
    </div>
  );
}

export default App;
