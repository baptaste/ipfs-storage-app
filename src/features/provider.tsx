import * as React from "react";

import { ManagerProvider } from "./manager";
import { AuthProvider } from "./src/auth";
import { PasswordsProvider } from "./src/passwords";
import { NotesProvider } from "./src/notes";

export interface ProviderProps {
  children: React.ReactNode;
}

export type ContextProvider = React.FC<ProviderProps>;

function combineProviders(...providers: ContextProvider[]): React.FC<ProviderProps> {
  return providers.reduce(
    (AccumulatedProviders: ContextProvider, CurrentProvider: ContextProvider) => {
      // eslint-disable-next-line react/display-name, react/function-component-definition
      return ({ children }: ProviderProps): JSX.Element => {
        return (
          <AccumulatedProviders>
            <CurrentProvider>{children}</CurrentProvider>
          </AccumulatedProviders>
        );
      };
    },
    ({ children }: ProviderProps) => children,
  );
}

const providers = [ManagerProvider, AuthProvider, PasswordsProvider, NotesProvider];
const AppProvider = combineProviders(...providers);
export default AppProvider;
