import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { decryptUserData, encryptUserData } from "../utils/crypto";
import PasswordPad from "../component/PasswordPad";
import { v4 as uuidv4 } from 'uuid';

interface UserInfo {
  id:string;
  password:string;
  createdAt:string;
}

export default function Login() {
    const navigate = useNavigate();
    const [errorMsg,setErrorMsg] = useState<string>('');
    const [reset,setReset] = useState<boolean>(false);

    const inputReset = () => {
      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 0);
    }

    const passwordCheck = (password:string) => {
        const walletData = localStorage.getItem('wallet_data');
      
        if(!walletData){
            setErrorMsg('등록된 계정이 없습니다.');
            inputReset();
            return
        };

        const parseData = JSON.parse(walletData);
        const parsePassword = decryptUserData(parseData.password);
        const parseMnemonic = decryptUserData(parseData.mnemonic);
        //import로 생성된 지갑
        if(walletData && parseMnemonic && parseData.isImport && !parsePassword){
          const userInfo:UserInfo = {
          ...parseData,
          id: encryptUserData(uuidv4()),
          password: encryptUserData(password),
          createdAt: encryptUserData(new Date().toISOString()),
          active:true
          };
        localStorage.setItem('wallet_data', JSON.stringify(userInfo));
        navigate('/wallet');
        }
        //localStorage에 있는 비밀번호와 비교
        if(parsePassword !== password){
          setErrorMsg('Passcode do not match. Try again.');
          inputReset();
          return;
        }
        navigate('/wallet');
    };

  return (
    <PasswordPad
    errorMsg={errorMsg}
    complete={passwordCheck}
    reset={reset}
    />
  )
}
