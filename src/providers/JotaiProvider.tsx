import { Provider } from "jotai";
import type { PropsWithChildren } from "react";
import { store } from "../consts";

type JotaiProviderProps = PropsWithChildren;

export const JotaiProvider = ({ children }: JotaiProviderProps) => (
  <Provider store={store}>{children}</Provider>
);
