import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { getManageRestaurant } from "@/api/get-managed-shop";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import z from "zod";

const profilePageRestaurant = z.object({
  name: z.string().min(1),
  description: z.string().min(1)
})

 type ProfilePagesRestaurantSchema = z.infer< typeof profilePageRestaurant>

export function StoreProfileDialog() {
  const { data: managedRestaurante } = useQuery({
    queryFn: getManageRestaurant,
    queryKey: ["managed-restaurant"],
  });
  console.log(managedRestaurante);

  const { register, handleSubmit } = useForm<ProfilePagesRestaurantSchema>({
    resolver: zodResolver(profilePageRestaurant),
    values: {
      name: managedRestaurante?.name ?? "",
      description: managedRestaurante?.description ?? "",
    },
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          {" "}
          Atualize as informações da sua loja
        </DialogDescription>
      </DialogHeader>

      <form>
        <div className="space-y-4 py-4">
          <div className="grid-cols-4 grid items-center gap-4">
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
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
