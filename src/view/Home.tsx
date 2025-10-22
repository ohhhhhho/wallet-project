
export default function Home() {
  return (
    <main id="home">
        <section className="section">
            <div className='inner'>
                <div className="logo-wrap">
                    <h1 className="logo">
                        <span className="blind">Creditcoin</span>
                    </h1>
                    <p className="">Welcome to the
                        Credit Wallet!
                    </p>
                </div>
                <div className="link-wrap button-area">
                    <a href='/signup' className='button-common'>
                        <span>CreateWallet</span>
                    </a>
                    <a href='/import' className='link'>
                        <span>I already have a wallet</span>
                    </a>
                </div>
            </div>
        </section>
    </main>
  )
}
