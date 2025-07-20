import { ArrowRight, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { OrdersDetails } from "@/pages/app/orders/orders-details";

export function OrderTableRow() {
  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="h-3 w-3" />
                <span className="sr-only">Detalhes do Pedido</span>
              </Button>
            </DialogTrigger>
            <OrdersDetails />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {" "}
          Teste teste
        </TableCell>
        <TableCell className="text-muted-foreground">Há 15 min</TableCell>
        <TableCell className="">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="font-medium text-muted-foreground"> Pendente</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">Nome do CLiente</TableCell>
        <TableCell className="font-medium">$150,23</TableCell>
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
