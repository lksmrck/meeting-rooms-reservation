import { createContext, ReactNode, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface AppContextInterface {
  /*     setSelectedCrypto: Dispatch<SetStateAction<string>>;
    selectedCrypto: string;
    transactionType: "buy" | "sell";
    setTransactionType: Dispatch<SetStateAction<"buy" | "sell">>;
    formShown: boolean;
    setFormShown: Dispatch<SetStateAction<boolean>>; */
}

const AppContext = createContext<AppContextInterface | null>(null);

export const FormContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
export default AppContext;
