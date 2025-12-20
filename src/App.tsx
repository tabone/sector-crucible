import { useState } from "react";
import { SimulationContext } from "./contexts";
import { Simulation } from "./libs/Simulation";
import { Universe } from "./universe";
import { Sector as SectorModel } from "./libs/Sector";
import { Sector } from "./sector";
import { MainMenu } from "./MainMenu";

export const App = () => {
  const [simulation, setSimulation] = useState<null | Simulation>(null);
  const [sector, setSector] = useState<SectorModel>();

  return (
    <SimulationContext value={simulation}>
      {simulation ? (
        <>
          <Universe onSectorView={setSector} />{" "}
          {sector && <Sector sector={sector} />}
        </>
      ) : (
        <MainMenu onSimulationCreation={setSimulation} />
      )}
    </SimulationContext>
  );
};
