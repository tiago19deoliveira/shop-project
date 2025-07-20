import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export interface PaginationProps {
  pageIndex: number; //index da página
  totalCount: number; //total de itens
  perPage: number; // quantos itens vem na página
}
// destructing de propriedades
export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  // formatação para contagem de páginas
  const pages = Math.ceil(totalCount / perPage) || 1;
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-6">
        <div className="text-sm font-medium">
          {" "}
          Pagina {pageIndex + 1} de {pages}
        </div>
        <div className="ga-2 flex items-center">
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Primeira Página</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página Anterior</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima Página</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Última Página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
