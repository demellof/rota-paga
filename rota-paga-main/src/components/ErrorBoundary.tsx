import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: '#e0e0e0', minHeight: '100vh', fontFamily: 'monospace' }}>
                    <h1 style={{ color: '#c8a44d' }}>Algo correu mal.</h1>
                    <p>Ocorreu um erro na aplicação. Esta informação é crucial para a depuração.</p>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', backgroundColor: '#2c2c2c', padding: '15px', borderRadius: '5px' }}>
                        <summary style={{ cursor: 'pointer', color: '#a37e2c' }}>Detalhes do Erro</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
