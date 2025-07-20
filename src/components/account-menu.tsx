import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";

export function AccountMenu() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            Shop Project
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>Tiago O.</span>
            <span>tiagodevp@gmail.com</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Building className="mr-2 h-4 w-4" />
            <span>Perfil do Estabelecimento</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="text-rose-500 dark:text-rose-400" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent> 
      </DropdownMenu>
    </div>
  );
}
 