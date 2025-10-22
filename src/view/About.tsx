import { useNavigate } from "react-router-dom";
import { decryptUserData } from "../utils/crypto"
import { useEffect, useState } from "react";

interface WalletInfo {
    publicKey:string;
    privateKey:string;
}

export default function AboutWallet() {
    const navigate = useNavigate();
    const [walletInfo,setWalletInfo] = useState<WalletInfo>({
        publicKey:"",
        privateKey:""
    })
    useEffect(() => {
        const walletData = localStorage.getItem('wallet_data');
        if(!walletData){
            navigate('/');
        }else{
            const parseData = JSON.parse(walletData);
            setWalletInfo({
                publicKey:decryptUserData(parseData.publicKey),
                privateKey:decryptUserData(parseData.privateKey)
            });
        }
    },[navigate]);
    
  return (
    <main id="about">
        <section className="section">
            <div className="inner">
                <ul>
                    <li>
                        <h6>publicKey : </h6>
                        <p>{walletInfo.publicKey}</p>
                    </li>
                    <li>
                        <h6>privateKey : </h6>
                        <p>{walletInfo.privateKey}</p>
                    </li>
                </ul>
            </div>
      </section>
    </main>
  )
}
