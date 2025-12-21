import { memo, useActionState, useCallback, useEffect, useState } from "react";
import { Button, Text, Textfield } from "./components";
import { Simulation } from "./libs/Simulation";
import { useAtom, useSetAtom } from "jotai";
import { configAtom, simulationAtom } from "./atoms";

type Payload =
  | {
      form: null;
      message: null;
    }
  | {
      message: null;
      form: { seed: number; width: number; height: number };
    }
  | {
      form: null;
      message: string;
    };

const NUMBER_REGEX = /^\d+$/;

const onAction = (_: Payload, formData: FormData): Promise<Payload> => {
  const validation = [
    {
      field: "seed",
      validate: (val: string) => val !== "",
      message: "You must specify a seed for your universe.",
    },
    {
      field: "width",
      validate: (val: string) => val !== "",
      message: "You must indicate the width of each of the regions.",
    },
    {
      field: "height",
      validate: (val: string) => val !== "",
      message: "You must indicate the height of each of the regions.",
    },
    {
      field: "seed",
      validate: (val: string) => NUMBER_REGEX.test(val),
      message: "Seed must be an integer.",
    },
    {
      field: "width",
      validate: (val: string) => NUMBER_REGEX.test(val),
      message: "Width must be an integer.",
    },
    {
      field: "height",
      validate: (val: string) => NUMBER_REGEX.test(val),
      message: "Height must be an integer.",
    },
  ].find(({ field, validate }) => {
    return !validate(String(formData.get(field) || ""));
  });

  if (validation) {
    return Promise.resolve({
      form: null,
      message: validation.message,
    });
  }

  return new Promise((resolve) => {
    const [seed, width, height] = ["seed", "width", "height"].map((field) =>
      Number(formData.get(field) ?? "0"),
    );

    return resolve({
      message: null,
      form: { seed, width, height },
    });
  });
};

export const MainMenu = memo(() => {
  const [width, setWidth] = useState("50");
  const [height, setHeight] = useState("50");

  const [config, setConfig] = useAtom(configAtom);
  const setSimulation = useSetAtom(simulationAtom);

  const [seed, setSeed] = useState(() =>
    String(Math.floor(Math.random() * (9999 - 1000)) + 1000),
  );

  const [{ form, message }, formAction, isPending] = useActionState(onAction, {
    form: null,
    message: null,
  });

  const setupSimulation = useCallback(
    ({
      seed,
      width,
      height,
    }: {
      seed: number;
      width: number;
      height: number;
    }) => {
      const simulation = new Simulation({
        seed,
        settings: {
          sectors: {
            width: 25,
            height: 20,
          },
          regions: {
            width,
            height,
          },
        },
      });

      simulation.createUniverse();

      setSimulation(simulation);
    },
    [setSimulation],
  );

  useEffect(() => {
    if (!form) return;

    setConfig({
      seed: form.seed,
      width: form.width,
      height: form.height,
    });

    setupSimulation({
      seed: form.seed,
      width: form.width,
      height: form.height,
    });
  }, [form, setConfig, setupSimulation]);

  useEffect(() => {
    if (config) {
      setupSimulation({
        seed: config.seed,
        width: config.width,
        height: config.height,
      });
    }
  }, [config, setupSimulation]);

  return (
    <div className="flex justify-center items-center h-full w-full bg-[url(/background.png)] bg-opacity-20 bg-cover bg-no-repeat">
      {!config && (
        <form
          action={formAction}
          className="bg-teal-950 border border-emerald-300 py-3 px-4 flex flex-col gap-4 shadow-md shadow-black/70 basis-100"
        >
          <header>
            <Text
              component="h1"
              className="text-center font-bold uppercase text-xl"
            >
              SectorCrucible
            </Text>
          </header>

          <div className="flex flex-col gap-4">
            <Textfield
              disabled={isPending}
              label="Seed"
              name="seed"
              type="number"
              value={seed}
              onChange={(ev) => setSeed(ev.target.value)}
            />

            <div className="flex gap-4 flex-col md:flex-row">
              <Textfield
                disabled={isPending}
                label="Region Width"
                name="width"
                type="number"
                value={width}
                className="flex-1"
                onChange={(ev) => setWidth(ev.target.value)}
              />

              <Textfield
                disabled={isPending}
                label="Region Height"
                name="height"
                type="number"
                value={height}
                className="flex-1"
                onChange={(ev) => setHeight(ev.target.value)}
              />
            </div>

            {message && (
              <Text
                color="destructive"
                className="center text-center font-bold"
              >
                {message}
              </Text>
            )}
          </div>

          <footer>
            <Button fullWidth text="Create" />
          </footer>
        </form>
      )}
    </div>
  );
});
