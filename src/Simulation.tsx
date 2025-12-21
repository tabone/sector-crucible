import { useAtomValue } from "jotai";
import { MainMenu } from "./MainMenu";
import { Universe } from "./universe";
import { simulationAtom } from "./atoms";
import { Sector } from "./sector";
import { Credits } from "./credits";
import { Navigate, Route, Routes } from "react-router";

export const Simulation = () => {
  const simulation = useAtomValue(simulationAtom);

  return (
    <div className="h-screen w-screen bg-emerald-950">
      {!simulation ? (
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Universe />} />
          <Route path="/sector/:sectorCode" element={<Sector />} />
        </Routes>
      )}

      <div className="fixed bottom-4 left-2">
        <Credits />
      </div>
    </div>
  );
};
