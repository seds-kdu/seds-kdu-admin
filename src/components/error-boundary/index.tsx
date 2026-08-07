import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary caught]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 32,
            maxWidth: 600,
            margin: "40px auto",
            border: "1px solid #fca5a5",
            borderRadius: 8,
            background: "#fef2f2",
          }}
        >
          <h2 style={{ color: "#dc2626", marginTop: 0 }}>
            ⚠ Something went wrong
          </h2>
          <p style={{ color: "#7f1d1d" }}>
            <strong>Error:</strong>{" "}
            {this.state.error?.message ?? "Unknown error"}
          </p>
          <p style={{ color: "#6b7280", fontSize: 13 }}>
            This usually means the Supabase table for this resource does not
            exist yet, or RLS policies are blocking the request. Check the
            browser console for details.
          </p>
          <button
            onClick={() =>
              this.setState({ hasError: false, error: null })
            }
            style={{ marginRight: 8 }}
          >
            Retry
          </button>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
