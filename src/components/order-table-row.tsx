import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { OrdersDetails } from "@/pages/app/orders/orders-details";
import { OrderStatus } from "./order-status";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calcelOrder } from "@/api/cancel-order";
import type { GetOrdersQuery, GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/aprove-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}
export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId == orderId) {
            return { ...order, status };
          }
          return order;
        }),
      });
    });
  }

  const { mutateAsync: approveOrderFn, isPending: isApproveOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });

  const { mutateAsync: cancelOrderFn, isPending: isCancelOrder } = useMutation({
    mutationFn: calcelOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache(orderId, "canceled");
    },
  });

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                //size="xs"
              >
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do Pedido</span>
              </Button>
            </DialogTrigger>
            <OrdersDetails orderId={order.orderId} open={isDetailOpen} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {formatDistanceToNow(order.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </TableCell>
        <TableCell className="">
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {(order.total / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </TableCell>
        <TableCell>
          {order.status === "pending" && (
            <Button
              onClick={() => approveOrderFn({ orderId: order.orderId })}
              disabled={isApproveOrder}
              variant="outline"
              //size="xs"
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Aprovar
            </Button>
          )}

          {order.status === "processing" && (
            <Button
              onClick={() => dispatchOrderFn({ orderId: order.orderId })}
              disabled={isDispatchingOrder}
              variant="outline"
              //size="xs"
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Em entrega
            </Button>
          )}

          {order.status === "delivering" && (
            <Button
              onClick={() => deliverOrderFn({ orderId: order.orderId })}
              disabled={isDeliveringOrder}
              variant="outline"
              //size="xs"
            >
              <ArrowRight className="mr-2 h-3 w-3" />
              Entregue
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            disabled={
              !["pending", "processing"].includes(order.status) || isCancelOrder
            }
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            variant="ghost"
            //size="xs"
          >
            <X className="mr-2 h-3 w-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
