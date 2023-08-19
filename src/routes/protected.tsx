import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { lazyImport } from "../utils/imports";

// Dashboard
const DashboardRoute = lazyImport("../features/src/dashboard", "DashboardRoute");
// Passwords
const PasswordListRoute = lazyImport("../features/src/passwords", "PasswordListRoute");
const CreatePasswordRoute = lazyImport("../features/src/passwords", "CreatePasswordRoute");
const PasswordRoute = lazyImport("../features/src/passwords", "PasswordRoute");
const UpdatePasswordRoute = lazyImport("../features/src/passwords", "UpdatePasswordRoute");
// Notes
const NoteListRoute = lazyImport("../features/src/notes", "NoteListRoute");
const CreateNoteRoute = lazyImport("../features/src/notes", "CreateNoteRoute");
const NoteRoute = lazyImport("../features/src/notes", "NoteRoute");
const UpdateNoteRoute = lazyImport("../features/src/notes", "UpdateNoteRoute");
// Account
const AccountRoute = lazyImport("../features/src/account", "AccountRoute");
const ChangePasswordRoute = lazyImport("../features/src/account", "ChangePasswordRoute");

function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardRoute />}>
        {/* Passwords feature */}
        <Route path="passwords" element={<PasswordListRoute />}>
          <Route path="create" element={<CreatePasswordRoute />} />
          <Route path=":passwordId" element={<PasswordRoute />}>
            <Route path="update" element={<UpdatePasswordRoute />} />
          </Route>
        </Route>

        {/* Notes feature */}
        <Route path="notes" element={<NoteListRoute />}>
          <Route path="create" element={<CreateNoteRoute />} />
          <Route path=":noteId" element={<NoteRoute />}>
            <Route path="update" element={<UpdateNoteRoute />} />
            {/* TODO */}
          </Route>
          {/* TODO */}
        </Route>

        {/* Others features */}
      </Route>

      <Route path="account">
        <Route index element={<AccountRoute />} />
        <Route path="password" element={<ChangePasswordRoute />} />
      </Route>
    </Routes>
  );
}

export const protectedRoutes = [
  {
    path: "/*",
    element: <ProtectedRoutes />,
  },
];
