import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import tokenStateAtom from "../states/token-state";

const PrivateRoutes: React.FC = () => {
  const token = useRecoilValue(tokenStateAtom);
  const isLoggedIn = token !== null;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
