import { useNavigate } from "react-router-dom"
import { encryptUserData } from "../utils/crypto";
import { v4 as uuidv4 } from 'uuid';
import PasswordPad from "../component/PasswordPad";
import { useEffect } from "react";

interface UserInfo {
  id:string;
  password:string;
  createdAt:string;
}

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const walletData = localStorage.getItem('wallet_data');
    if(walletData){
        navigate('/login')
      }
  },[navigate])

  const passwordCheck = (password:string) => {
    const walletData = localStorage.getItem('wallet_data');
    if(!walletData){
        const userInfo:UserInfo = {
          id: encryptUserData(uuidv4()),
          password: encryptUserData(password),
          createdAt: encryptUserData(new Date().toISOString()),
        };
        localStorage.setItem('wallet_data', JSON.stringify(userInfo));
        navigate('/wallet');
    }else {
      navigate('/login')
    }
  }

  return (
    <PasswordPad
      complete={passwordCheck}
    />
  )
}
