type SidebarNoResultsProps = {
  message: string;
};

export const SidebarNoResults = ({ message }: SidebarNoResultsProps) => (
  <div className="text-center text-xs">{message}</div>
);
