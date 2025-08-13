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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { getManageRestaurant } from "@/api/get-managed-shop";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { StoreProfileDialog } from "./store-profile-dialog";
import { signOut } from "@/api/sign-out";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
    staleTime: Infinity
  });
  const { data: managedRestaurante, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryFn: getManageRestaurant,
      queryKey: ["managed-restaurant"],
      staleTime: Infinity
    });

  const {mutateAsync: signOutFn, isPending: isSignOut} = useMutation({
  mutationFn: signOut,
  onSuccess : () => {
    navigate('/sign-in', {replace:true})
  }
  })

  return (
    <div>
      <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurante?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-2 w-32"/>
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Perfil do Estabelecimento</span>
            </DropdownMenuItem>
          </DialogTrigger>
            <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400" disabled={isSignOut}>
              <Button onClick={() => signOutFn()} className="w-full">
                <LogOut className="text-rose-500 dark:text-rose-400" />
                <span>Sair</span>
              </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <StoreProfileDialog/>
      </DropdownMenu>

      </Dialog>
    </div>
  );
}
