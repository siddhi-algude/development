import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("Error boundary caught:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container-max py-16">
          <h1 className="text-xl font-semibold">Something went wrong.</h1>
          <p className="text-gray-600">{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function withErrorBoundary(Component) {
  return function Wrapped(props) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
