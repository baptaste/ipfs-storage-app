import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { FeatureList } from "../../../components";
import { EmptyFeature } from "../../../../components/Common";
import {
  FeatureNames,
  FeatureType,
  FeaturesRoutes,
  initialFeature,
  useManager,
} from "../../../manager";
import { useNotes } from "../store";

export function NoteListRoute() {
  const location = useLocation();
  const manager = useManager();
  const { notes, note, loading, error, dispatch } = useNotes();

  React.useEffect(() => {
    manager.dispatch({
      type: "set_feature",
      feature: {
        ...initialFeature,
        empty: !notes.length,
        name: FeatureNames.notes,
        route: FeaturesRoutes.notes,
        type: FeatureType.note,
      },
    });
  }, [notes]);

  React.useEffect(() => {
    console.log("••••••••• NoteListRoute - note", note);
    if (note && location.pathname === FeaturesRoutes.notes) {
      console.log("••••••••• NoteListRoute - reset note item");
      dispatch({ type: FeatureType.note, note: null });
    }
  }, [note, location.pathname]);

  if (!notes.length && manager.feature.empty) {
    return <EmptyFeature name={FeatureNames.notes} redirectTo={`${FeaturesRoutes.notes}/create`} />;
  }

  return (
    <>
      <FeatureList
        type={FeatureType.note}
        data={notes}
        dispatch={dispatch}
        loading={loading}
        error={error}
        name={FeatureNames.notes}
        route={FeaturesRoutes.notes}
      />
      <Outlet />
    </>
  );
}
