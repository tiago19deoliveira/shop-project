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
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManageRestaurant } from "@/api/get-managed-shop";

export function AccountMenu() {
 const {data: profile}= useQuery({
    queryFn: getProfile,
    queryKey:['profile']
  })
   const {data: maanagedRestaurante}= useQuery({
    queryFn: getManageRestaurant,
    queryKey:['managed-restaurant']
  })


  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {maanagedRestaurante?.name}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>{profile?.name}</span>
            <span>{profile?.email}</span>
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
 