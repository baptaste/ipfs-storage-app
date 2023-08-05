import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppProvider from "./features/provider";
import { AppRoutes } from "./routes";
import { Spinner } from "./components/Common";

import "./assets/styles/index.scss";

export default function App() {
  return (
    <div className="App bg-slate-50">
      <AppProvider>
        <Router>
          <React.Suspense fallback={<Spinner size="screen" />}>
            <AppRoutes />
          </React.Suspense>
        </Router>
      </AppProvider>
    </div>
  );
}
