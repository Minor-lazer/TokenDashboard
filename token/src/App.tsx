import { useState } from 'react'
import {ethers} from "ethers";
import type { MetaMaskInpageProvider } from "@metamask/providers";
import './App.css'
 declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance , setAccountBalance] = useState<string | null>(null);

  async function connectWallet() {
     console.log(window.ethereum,"window.ethereum")
     if (window.ethereum){
        try {
          const provider = new ethers.BrowserProvider(window.ethereum as MetaMaskInpageProvider);
          const accounts = await provider.send("eth_requestAccounts",[]);
          setAccount(accounts[0]);

          const rawBalance = await provider.getBalance(accounts[0]);
          setAccountBalance(ethers.formatEther(rawBalance));
          console.log("Ethereum balance is ",balance)

        }
        catch(err){
          console.log("Error connecting to wallet:", err);
        }

     }
     else {
      console.log("No wallet detected , please install metamask");
     }
  }



  return (
    <>
      <div>
         <h1>Token Dashboard week 1</h1> 
         {account ? (
          <>
           <p>Connected as: {account}</p>
           <p>Ethereum Balance :{balance}</p>
          </>
         ) : (
           <button onClick={connectWallet}>Connect Wallet</button>
         )}
      </div>
    </>
  )
}

export default App
