import {
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrdersFilterSchema = z.infer<typeof orderFilterSchema>;

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } =
    useForm<OrdersFilterSchema>({
      resolver: zodResolver(orderFilterSchema),
      defaultValues: {
        orderId: orderId ?? "",
        customerName: customerName ?? "",
        status: status ?? "all",
      },
    });

  function handlefilter({ orderId, customerName, status }: OrdersFilterSchema) {
    setSearchParams((state) => {
      if (orderId) {
        state.set("orderId", orderId);
      } else {
        state.delete("orderId");
      }

      if (customerName) {
        state.set("customerName", customerName);
      } else {
        state.delete("customerName");
      }

      if (status) {
        state.set("status", status);
      } else {
        state.delete("status");
      }

      state.set("page", "1");
      return state;
    });
  }

  function handleCloseFilters() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.set("page", "1");

      return state;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handlefilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="Id Pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Nome do Cliente"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />

      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="h-8 w-[180px] rounded-md border px-2">
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent
                position="popper"
                className="bg-black text-white border border-gray-700 rounded-md shadow-md z-50 w-[var(--radix-select-trigger-width)]"
              >
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </SelectPortal>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="m-4 mr-2 h-4" />
        Filtrar Resultados
      </Button>
      <Button
        onClick={handleCloseFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="m-4 mr-2 h-4" />
        Remover Filtros
      </Button>
    </form>
  );
}
