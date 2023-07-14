import * as React from "react";
import { Link } from "react-router-dom";

import { capitalize } from "../../../../../utils/string";
import { DeleteAccount, Logout, useAuth } from "../../../auth";

export function Settings() {
  const { user } = useAuth();

  return (
    <main className="Settings w-full md:w-1/2 md:mx-auto flex flex-col justify-between md:justify-normal md:pt-[90px] px-6">
      {user ? (
        <>
          <section
            id="preferences"
            className="w-full flex flex-col mb-10 border-b border-solid border-1 border-slate-300"
          >
            <h1 className="font-bold text-xl mb-3 text-slate-900">Preferences</h1>
            <div className="w-full flex flex-col mb-5">
              <p className="text-lg">Language</p>
              <p className="text-base">{capitalize(user.preferences.language)}</p>
            </div>
          </section>
          <section id="account" className="w-full flex flex-col mb-5">
            <h1 className="font-bold text-xl mb-3 text-slate-900">Account</h1>
            <div className="w-full flex flex-col mb-5">
              <p className="text-lg">Email</p>
              <p className="text-base">{user.email}</p>
            </div>
            <div className="w-full flex flex-col mb-5">
              <p className="text-lg">Password</p>
              <Link to="/settings/password" className="text-lg">
                Change password
              </Link>
            </div>
            <div className="w-full mb-5">
              <Logout />
            </div>
            <div className="w-full mb-5">
              <DeleteAccount />
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
