import { Navigate, Outlet } from "react-router-dom";
import { decryptUserData } from "../utils/crypto";

export default function ProtectedRoute(){
    const walletData = localStorage.getItem('wallet_data');
    if (!walletData) {
      return <Navigate to="/" replace={true}/>;
    }

    const parsedWalletData = JSON.parse(walletData);
    if(!parsedWalletData.id && !parsedWalletData.password){
      return <Navigate to="/" replace={true}/>;
    }

    const parseId = decryptUserData(parsedWalletData.id)
    const parsePassword = decryptUserData(parsedWalletData.password)
    if(!parseId && !parsePassword){
      return <Navigate to="/" replace={true}/>;
    }

    return <Outlet />
}
