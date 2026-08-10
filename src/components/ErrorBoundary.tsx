import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  declare props: Props;
  declare state: State;
  declare setState: Component<Props, State>["setState"];

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#BAFC50]/10 border border-[#BAFC50]/40 flex items-center justify-center text-[#BAFC50] text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-white">Lapa tika atjaunota</h2>
          <p className="text-sm text-zinc-400 max-w-md">
            Lūdzu, pārlādējiet lapu, lai turpinātu pārlūkošanu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = "/";
              }}
              className="px-6 py-2.5 bg-[#BAFC50] text-black font-extrabold text-sm rounded-full hover:bg-[#a8f235] transition-colors cursor-pointer shadow-lg shadow-[#BAFC50]/20"
            >
              Atgriezties sākumlapā
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-zinc-800 text-zinc-200 font-bold text-sm rounded-full hover:bg-zinc-700 transition-colors cursor-pointer border border-zinc-700"
            >
              Pārlādēt lapu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
