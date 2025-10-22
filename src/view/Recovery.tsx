import { useNavigate } from "react-router-dom";
import { decryptUserData } from "../utils/crypto";
import { useEffect, useRef, useState } from "react";

export default function Recovery() {
    const navigate = useNavigate();
    const [mnemonic,setMnemonic] = useState<string>("");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const walletData = localStorage.getItem('wallet_data');
        if(!walletData) {
            navigate('/');
            return
        }
        const parseData = JSON.parse(walletData)
        setMnemonic(decryptUserData(parseData.mnemonic))
    },[navigate])
    const onClickCopy = async() => {
        if(!ref.current) return;
        await navigator.clipboard.writeText(ref.current.innerText);
        alert('니모닉 복사 성공')
    }
  return (
    <main id="recovery">
        <section className="section">
            <div className="inner">
                <div ref={ref} className="mnemonic">
                    {mnemonic}
                </div>
                <div className="button-area">
                    <button onClick={onClickCopy} className="button-common">COPY</button>
                </div>
            </div>
        </section>
    </main>
  )
}
