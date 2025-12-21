import { memo, useCallback, useState } from "react";
import { Button } from "../components";
import { Attributions } from "./Attributions";

export const Credits = memo(() => {
  const [isVisible, setVisibility] = useState(false);

  const open = useCallback(() => setVisibility(true), []);
  const close = useCallback(() => setVisibility(false), []);

  return (
    <>
      <Button text="?" onClick={open} condensed />
      {isVisible && <Attributions onClose={close} />}
    </>
  );
});
