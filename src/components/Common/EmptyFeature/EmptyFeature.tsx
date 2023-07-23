import * as React from "react";

import SleepingKoalaImg from "../../../assets/img/sleeping-koala.jpg";
import { AppLink } from "../AppLink";
import { FeatureNames } from "../../../features/manager";

interface EmptyFeatureProps {
  name: FeatureNames;
  redirectTo: string;
}

export function EmptyFeature(props: EmptyFeatureProps) {
  const { name, redirectTo } = props;
  return (
    <div className="EmptyScreen w-full h-full flex flex-col items-center justify-between gap-6">
      <h1 className="text-xl font-bold mb-5">Wow, it's empty here</h1>
      <img
        loading="lazy"
        src={SleepingKoalaImg}
        width={250}
        height={250}
        className="rounded-full"
        alt="Empty"
      />
      <p className="font-bold text-base">Start storing {name} now</p>
      <AppLink path={redirectTo} text="Get started" theme="secondary" />
    </div>
  );
}
