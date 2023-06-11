import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Spinner } from "./components/Common";
import { AppRoutes } from "./routes";
import { FeaturesProvider } from "./features/store";

import "./assets/styles/index.scss";

export default function App() {
	return (
		<div className="App">
			<FeaturesProvider>
				<Router>
					<React.Suspense fallback={<Spinner size="screen" />}>
						<AppRoutes />
					</React.Suspense>
				</Router>
			</FeaturesProvider>
		</div>
	);
}
