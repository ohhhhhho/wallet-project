import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps{
    userInfo:boolean;
}

export default function ProtectedRoute({userInfo}:ProtectedRouteProps){
    // const userInfo = sessionStorage.getItem('userInfo');
  if(!userInfo || userInfo === null){
    return <Navigate to="/" replace={true} />
  }
    return <Outlet />
}
