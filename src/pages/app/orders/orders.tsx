import { getOrders } from "@/api/get-orders";
import { OrderTableFilters } from "@/components/order-table-filters";
import { OrderTableRow } from "@/components/order-table-row";
import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";


export function Orders() {
  const {data: result} = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

      <div className="space-y-2.5">
        <OrderTableFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador </TableHead>
                <TableHead className="w-[180px]"> Realizado há :</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do Pedido</TableHead>
                <TableHead className="w-[164px]">Aprovar </TableHead>
                <TableHead className="w-[132px]">Cancelar </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Lógica js de renderização com base no tamanho da tabela, utilizando o index e repassando ele ao componente OrderTableRow como prop de ref*/}
              
              {
                result && result.orders.map((order) =>{
                  return <OrderTableRow key={order.orderId} order={order}/>
                })
              }
            </TableBody>
          </Table>
        </div>
        <Pagination pageIndex={0} totalCount={105} perPage={10} />
      </div>
    </div>
  );
}
 