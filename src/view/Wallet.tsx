import { useEffect } from "react";
import { decryptUserData, encryptUserData } from "../utils/crypto";
import { HDNodeWallet, Mnemonic } from "ethers";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const navigate = useNavigate();
  useEffect(() => {
    const walletData = localStorage.getItem('wallet_data');
    if (!walletData){ 
      navigate('/');
      return
    }
    
    const parseData = JSON.parse(walletData);
    const parsePassword = decryptUserData(parseData.password);

    //import로 생성된 지갑
    if(walletData && parseData.mnemonic && parseData.active){
      const parseMnemonic = decryptUserData(parseData.mnemonic);
      const mnemonic = Mnemonic.fromPhrase(parseMnemonic);
      const keys = HDNodeWallet.fromMnemonic(mnemonic);
      const updatedState = {
        ...parseData,
        publicKey: encryptUserData(keys.publicKey),
        privateKey: encryptUserData(keys.privateKey),
        address: encryptUserData(keys.address),
      }
    localStorage.setItem('wallet_data',JSON.stringify(updatedState));
    };
    //일반 지갑 생성
    if(!parseData.mnemonic){
      const createMnemonic = HDNodeWallet.createRandom(parsePassword);
      const mnemonicPharse = createMnemonic.mnemonic?.phrase || ""
      const mnemonic = Mnemonic.fromPhrase(mnemonicPharse);
      const keys = HDNodeWallet.fromMnemonic(mnemonic);

      const updatedState = {
        ...parseData,
        mnemonic: encryptUserData(mnemonicPharse),
        publicKey: encryptUserData(keys.publicKey),
        privateKey: encryptUserData(keys.privateKey),
        address: encryptUserData(keys.address),
      }
      localStorage.setItem('wallet_data',JSON.stringify(updatedState));
    }
}, [navigate]);

  return (
    <main id="wallet">
      <section className="section balance">
        <div className="inner">
            <div className="user-info">
              <p>Total CTC Balance</p>
              <h3>0 CTC</h3>
            </div>
            <div className="button-area">
              <a href="/about" className="button-common"><span>About Wallet</span></a>
              <a href="/recovery" className="button-common"><span>Recovery phrase</span></a>
            </div>
        </div>
      </section>
    </main>
  );
}
