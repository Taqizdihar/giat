import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-950/20 rounded-3xl border-2 border-dashed border-red-200 dark:border-red-900/50">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-giat-red" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ops, Terjadi Kesalahan!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Komponen ini mengalami masalah saat dimuat. Coba muat ulang halaman atau hubungi administrator jika masalah berlanjut.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-giat-red text-white rounded-xl hover:bg-giat-red/90 transition-all font-bold mx-auto shadow-lg shadow-giat-red/20 active:scale-95"
            >
              <RefreshCw className="w-4 h-4" /> Muat Ulang
            </button>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-left text-xs text-red-600 dark:text-red-400 overflow-auto whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
