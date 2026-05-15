"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/store/store";
import { Button } from "@/components/ui/button";
function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Something interrupted the page.</p>
        <h2 className="mt-3 text-2xl font-semibold">The workspace is still intact.</h2>
        <Button className="mt-6" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    </div>
  );
}
export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
