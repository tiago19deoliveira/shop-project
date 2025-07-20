import { DialogHeader } from "@/components/ui/dialog";
import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Table } from "lucide-react";

export function OrdersDetails() {
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido: 8w99w8w8w</DialogTitle>
          <DialogDescription>Detalhes do pedido:</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    {" "}
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    {" "}
                    Cebola jr
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    {" "}
                    92985229321
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    {" "}
                    desmantelado@gmail.com
                  </span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Realizado há:
              </TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    {" "}
                    3 minutos
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">SubTotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PIzza family indian</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 69,90</TableCell>
                <TableCell className="text-right">r$ 139,80</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PIzza family Indonesian</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">R$ 59,90</TableCell>
                <TableCell className="text-right">r$ 59,80</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do Pedido</TableCell>
                <TableCell className="text-right font-medium">
                  R$ 259,60
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </div>
  );
}
