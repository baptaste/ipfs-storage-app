import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import { FeaturesNav } from "../../../components";
import { FeatureNames, FeaturesRoutes } from "../../../manager";
import { usePasswords } from "../../passwords";
import { useNotes } from "../../notes";
import { sortByDate } from "../../../../utils/array";
import { formatDate } from "../../../../utils/date";
import { capitalize } from "../../../../utils/string";
import { IPasswords } from "../../passwords/types";
import { INotes } from "../../notes/types";

interface DashboardFeature {
  name: FeatureNames;
  path: FeaturesRoutes;
  items: IPasswords | INotes;
}

export function Dashboard() {
  const location = useLocation();
  const { passwords } = usePasswords();
  const { notes } = useNotes();

  const features: DashboardFeature[] = [
    { name: FeatureNames.passwords, path: FeaturesRoutes.passwords, items: passwords },
    { name: FeatureNames.notes, path: FeaturesRoutes.notes, items: notes },
  ];

  return (
    <div className="Dashboard w-full h-full flex flex-col items-center self-start gap-6 md:px-8 md:pt-32">
      <div
        className={`w-full ${
          location.pathname === FeaturesRoutes.dashboard ? "block" : "hidden"
        } md:hidden`}
      >
        <FeaturesNav />
      </div>
      {location.pathname === FeaturesRoutes.dashboard ? (
        <main className="w-full flex flex-col gap-6">
          <h1 className="text-xl font-bold">Your stored items</h1>
          <ul className="w-full flex flex-col md:flex-row items-center md:flex-wrap gap-6">
            {features.map((feature) => {
              return feature.items.length ? (
                <li
                  key={feature.name}
                  className="bg-slate-100 hover:bg-slate-50 transition-colors rounded-md border-solid border border-slate-300"
                >
                  <Link to={feature.path} className="w-80 flex flex-col gap-4 p-4">
                    <h3 className="font-bold">{capitalize(feature.name)}</h3>
                    <div className="flex flex-col gap-2">
                      <h4>
                        {feature.items.length} {FeatureNames[feature.name]}
                      </h4>
                      <p className="text-sm text-slate-500">
                        Last modification{" "}
                        {feature.items[0]?.updated_at
                          ? formatDate(sortByDate(feature.items)[0]?.updated_at)
                          : formatDate(sortByDate(feature.items)[0]?.created_at)}
                      </p>
                    </div>
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </main>
      ) : null}
    </div>
  );
}
