import { atomWithStorage } from "jotai/utils";

export const configAtom = atomWithStorage<null | {
  seed: number;
  width: number;
  height: number;
}>("config", null, undefined, { getOnInit: true });
