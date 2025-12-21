import { BrowserRouter } from "react-router";
import { Simulation } from "./Simulation";
import { JotaiProvider } from "./providers";

export const App = () => {
  return (
    <JotaiProvider>
      <BrowserRouter basename="/sector-crucible/">
        <Simulation />
      </BrowserRouter>
    </JotaiProvider>
  );
};
