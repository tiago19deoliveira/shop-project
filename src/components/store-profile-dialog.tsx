import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getManageRestaurant,
  type GetManageRestaurantResponse,
} from "@/api/get-managed-shop";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { updatedProfile } from "@/api/update-profile";
import { toast } from "sonner";

const profilePageRestaurant = z.object({
  name: z.string().min(1),
  description: z.string().min(1).nullable(),
});

type ProfilePagesRestaurantSchema = z.infer<typeof profilePageRestaurant>;

export function StoreProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurante } = useQuery({
    queryFn: getManageRestaurant,
    queryKey: ["managed-restaurant"],
    staleTime: Infinity,
  });
  console.log(managedRestaurante);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfilePagesRestaurantSchema>({
    resolver: zodResolver(profilePageRestaurant),
    values: {
      name: managedRestaurante?.name ?? "",
      description: managedRestaurante?.description ?? "",
    },
  });

  function updatedManageCachedRestaurant({
    name,
    description,
  }: ProfilePagesRestaurantSchema) {
    const cached = queryClient.getQueryData<GetManageRestaurantResponse>([
      "managed-restaurant",
    ]);
    if (cached) {
      queryClient.setQueryData<GetManageRestaurantResponse>(
        ["managed-restaurant"],
        {
          ...cached,
          name,
          description,
        },
      );
    }
    return {cached}
  }

  const { mutateAsync: updatedProfileFn } = useMutation({
    mutationFn: updatedProfile,
    onMutate({ description, name }) {
     const {cached}= updatedManageCachedRestaurant({ name, description });
     return {previousProfile : cached}
    },
    onError(_,__,context){
    if(context?.previousProfile) {
      updatedManageCachedRestaurant(context.previousProfile)
    }
    }
  });


  async function handleUpdateProfile(data: ProfilePagesRestaurantSchema) {
    try {
      await updatedProfileFn({
        name: data.name,
        description: data.description ?? "",
      });
      toast.success("Perfil atualizado !");
    } catch (error) {
      toast.error("Houve um Problema ao atualizar o perfil !");
      console.log("Erro ao atualizar", error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          {" "}
          Atualize as informações da sua loja
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-1" id="name" {...register("name")} />
          </div>
        </div>
        <div className="gap-4 space-y-4 py-4">
          <div className="grid-col-4 grid items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
