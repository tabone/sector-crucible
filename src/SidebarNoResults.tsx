import { Text } from "./components";

type SidebarNoResultsProps = {
  message: string;
};

export const SidebarNoResults = ({ message }: SidebarNoResultsProps) => (
  <Text className="text-center text-xs">{message}</Text>
);
