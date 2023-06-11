import * as React from "react";
import { AuthProvider } from "../src/auth";
import { PasswordsProvider } from "../src/passwords";

import { FeaturesContext, initialFeaturesState } from "./context";
import { featuresReducer } from "./reducer";

export function FeaturesProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = React.useReducer(featuresReducer, initialFeaturesState);

	const featuresValue = React.useMemo(() => {
		return {
			feature: state.feature,
			error: state.error,
			loading: state.loading,
			dispatch,
		};
	}, [state.feature, state.error, state.loading, dispatch]);

	React.useEffect(() => {
		console.log("FeaturesProvider - feature", state.feature);
	}, [state.feature]);

	return (
		<FeaturesContext.Provider value={featuresValue}>
			<AuthProvider>
				<PasswordsProvider>{children}</PasswordsProvider>
			</AuthProvider>
		</FeaturesContext.Provider>
	);
}
