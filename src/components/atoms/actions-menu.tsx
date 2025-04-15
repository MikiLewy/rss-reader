import { MoreHorizontal } from 'lucide-react';

import { Button } from '../ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Action {
  key: string;
  label: string;
  onClick: () => void;
}

interface Props {
  actions: Action[];
}

const ActionsMenu = ({ actions }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map(action => (
          <DropdownMenuItem key={action.key} onClick={action.onClick}>
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
