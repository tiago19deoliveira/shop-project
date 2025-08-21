import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { OrdersDetails } from "@/pages/app/orders/orders-details";
import { OrderStatus } from "./order-status";
import {formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale'
import { useState } from "react";


export interface OrderTableRowProps {
  order:{
    orderId:string;
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName:string
    total:number
  }
}
export function OrderTableRow({order}: OrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen]= useState(false)


  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
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
          {formatDistanceToNow(order.createdAt ,{
            locale: ptBR,
            addSuffix:true
          })}
        </TableCell>
        <TableCell className="">
         <OrderStatus status={order.status}/>
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">{(order.total /100).toLocaleString('pt-BR',{
          style: 'currency',
          currency:'BRL'
        })}</TableCell>
        <TableCell>
          <Button variant="outline" size="xs">
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="xs">
            <X className="mr-2 h-3 w-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
