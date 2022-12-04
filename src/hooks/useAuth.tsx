import { useContext } from "react";
import AuthContext from "../state/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
