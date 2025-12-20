import { useCallback, useState } from "react";
import { Simulation } from "./libs/Simulation";

type MainMenuProps = {
  onSimulationCreation: (simulation: Simulation) => void;
};
export const MainMenu = ({ onSimulationCreation }: MainMenuProps) => {
  const [seed, setSeed] = useState<string>("");

  const onCreate = useCallback(() => {
    const sim = new Simulation({
      seed: Number(seed),
      settings: {
        regions: {
          width: 50,
          height: 50,
        },
      },
    });

    sim.createUniverse();

    onSimulationCreation(sim);
  }, [seed, onSimulationCreation]);

  return (
    <>
      <input value={seed} onChange={(ev) => setSeed(ev.target.value)} />
      <button onClick={onCreate}>Create</button>
    </>
  );
};
