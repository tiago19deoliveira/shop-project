import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider storageKey="shop-project-theme" defaultTheme="dark">
          <Toaster richColors />
          <Helmet titleTemplate="%s | shop.product" />
          <QueryClientProvider client={queryClient}>
           <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}
