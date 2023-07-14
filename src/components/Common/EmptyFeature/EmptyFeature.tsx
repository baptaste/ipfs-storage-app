import * as React from "react";
import SleepingKoalaImg from "../../../assets/img/sleeping-koala.jpg";
import { AppLink } from "../AppLink";

interface EmptyFeatureProps {
  name: string;
  redirectTo: string;
}

export function EmptyFeature({ name, redirectTo }: EmptyFeatureProps) {
  return (
    <div className="EmptyScreen w-full lg:w-1/3 h-full flex flex-col items-center justify-between pb-4">
      <h1 className="text-xl font-bold mb-5">Wow, it's empty here</h1>
      <img
        loading="lazy"
        src={SleepingKoalaImg}
        width={250}
        height={250}
        className="rounded-full"
        alt="Empty"
      />
      <p className="font-bold text-base">
        Start storing
        {name} now
      </p>
      <AppLink path={`/dashboard${redirectTo}`} text="Get started" theme="secondary" />
    </div>
  );
}
