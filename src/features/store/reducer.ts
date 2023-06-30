import { IManagerState } from "./context";

export const managerReducer = (state: IManagerState, action: any): IManagerState => {
	switch (action.type) {
		case "set_error":
			return { ...state, error: action.error };
		case "set_loading":
			return { ...state, loading: action.loading };
		case "set_notification":
			return { ...state, notification: action.notification };
		case "set_feature":
			return { ...state, feature: action.feature };
		case "set_feature_item_id":
			return { ...state, feature: { ...state.feature, itemId: action.itemId } };
		case "set_is_creating_item":
			return { ...state, feature: { ...state.feature, creating: action.creating } };
		case "set_is_updating_item":
			return { ...state, feature: { ...state.feature, updating: action.updating } };
		default:
			return state;
	}
};
