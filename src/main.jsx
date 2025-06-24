import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer';

const Main = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </React.StrictMode>
    );
};

// Fix: prevent double root creation during hot reload
const container = document.getElementById('root');
if (!container._reactRoot) {
    container._reactRoot = ReactDOM.createRoot(container);
}
container._reactRoot.render(<Main />);
