import { Link, useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError() as Error
  return (
    <div className="gap 2 flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold"> Algo Deu Errado !</h1>
      <p className="text-accent-foreground">
        Um erro foi Encontrado na aplicação, mais detalhes abaixo:
      </p>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
         Voltar Para o {""}
        <Link to="/" className="text-sky-700 dark:text-sky-400">
          Dashborad
        </Link>
      </p>
    </div>
  );
}
