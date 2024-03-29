import * as React from "react";

import { AppLink } from "../../../components/Common";
import { VisiterLayout } from "../../../components/Layout";
import { FeaturesRoutes } from "../../manager";

export function Landing() {
  return (
    <VisiterLayout>
      <div className="Landing w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-center text-slate-900 dark:neon-blur w-full text-5xl font-bold mb-5">
          Decentralized
          <br />
          storage
          <br />
          solution
        </h1>
        <p className="text-lg leading-relaxed text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <AppLink path={FeaturesRoutes.login} text="Store data now" />
      </div>
    </VisiterLayout>
  );
}
