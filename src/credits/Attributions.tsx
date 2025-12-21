import { memo, useId } from "react";
import { Button, Container, Divider, Link, Text } from "../components";

type AttributionsProps = {
  onClose: () => void;
};

export const Attributions = memo(({ onClose }: AttributionsProps) => {
  const titleID = useId();

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <Container
        aria-labelledby={titleID}
        className="border border-emerald-300 py-3 px-4 flex flex-col gap-4 basis-200 shrink grow-0"
      >
        <header className="relative">
          <Text
            id={titleID}
            component="h2"
            color="primary"
            className="uppercase font-bold"
          >
            Credits
          </Text>

          <Divider className="mt-2" />

          <Button
            onClick={onClose}
            condensed
            text="Close"
            className="absolute top-0 right-0"
          />
        </header>

        <div className="flex flex-col gap-4">
          <div>
            <Text>
              Ironsworn: Starforged is ©{" "}
              <Link
                href="https://tomkinpress.com/"
                target="_blank"
                text="Shawn Tomkin"
              />
              .
            </Text>
          </div>

          <div>
            <Text>
              SectorCrucible is ©{" "}
              <Link
                href="https://lucatabone.com/"
                target="_blank"
                text="Luca Tabone"
              />
              .
            </Text>
          </div>

          <div>
            <Text>
              Ironsworn: Starforged planet tokens by{" "}
              <Link
                href="https://joshmeehanart.com/"
                target="_blank"
                text="Joshua Meehan"
              />
              .
            </Text>
          </div>

          <div>
            <Text>
              Made with icons from game-icons.net by{" "}
              <Link
                href="https://lorcblog.blogspot.com/"
                target="_blank"
                text="Lorc"
              />{" "}
              and{" "}
              <Link
                href="https://delapouite.com/"
                target="_blank"
                text="Delapouite"
              />
              .
            </Text>
          </div>

          <div>
            <Text>
              Made with ❤️ by{" "}
              <Link href="https://lucatabone.com/" target="_blank" text="me" />{" "}
              ^.^/. If you like this app and want to say thanks you can{" "}
              <Link
                href="https://ko-fi.com/tabone"
                target="_blank"
                text="buy me a coffee"
              />
              .
            </Text>
          </div>
        </div>

        <Divider />

        <div className="text-center">
          <Text className="text-sm">
            This work is based on{" "}
            <Link
              href="https://tomkinpress.com/"
              target="_blank"
              text="Ironsworn: Starforged"
            />
            , created by Shawn Tomkin, and licensed for our use under the{" "}
            <Link
              href="https://creativecommons.org/licenses/by-nc-sa/4.0//"
              target="_blank"
              text="Creative Commons Attribution 4.0 International License"
            />
            .
          </Text>
        </div>
      </Container>
    </div>
  );
});
