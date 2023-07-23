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
// Settings
const SettingsRoute = lazyImport("../features/src/settings", "SettingsRoute");
const ChangePasswordRoute = lazyImport("../features/src/settings", "ChangePasswordRoute");

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
          {/* TODO */}
        </Route>
        {/* Others features */}
      </Route>

      <Route path="settings">
        <Route index element={<SettingsRoute />} />
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
