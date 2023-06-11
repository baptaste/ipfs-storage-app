import { IFeaturesState } from "./context";

export const featuresReducer = (state: IFeaturesState, action: any): IFeaturesState => {
	if (action.type === "feature") {
		return {
			...state,
			feature: action.feature,
		};
	}
	// default
	return state;
};
