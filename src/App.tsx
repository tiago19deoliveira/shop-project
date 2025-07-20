import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider storageKey="shop-project-theme" defaultTheme="dark">
          <Toaster richColors />
          <Helmet titleTemplate="%s | shop.product" />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}
