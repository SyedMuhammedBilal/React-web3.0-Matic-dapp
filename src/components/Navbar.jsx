import React, { useEffect, useState } from "react";
import Web3 from "web3";

import "../App.css";
import { SessionStorageService } from "../helper/session-storage";
import { setAccount } from "../store/smartContract";

const Navbar = () => {
  const [publicKey, setPublicKey] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const walletInitializer = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const accounts = await web3.eth.requestAccounts();
    setPublicKey(accounts[0]);
    setAccount(accounts[0]);
  }

  useEffect(() => {
    if (publicKey) {
      localStorage.setItem("public", publicKey);
    }
  }, [publicKey, walletInitializer])

  useEffect(() => {
    const localUser = localStorage.getItem('public');
    if (localUser) {
      setPublicKey(localUser)
      setAccount(localUser);
    }
  }, [])

  return (
    <div className="category-lists">
      <div>
        <h2>Blog web3.0</h2>
      </div>
      <div>
        {!publicKey ? (
          <button onClick={walletInitializer}> connect your wallet </button>
        ): (
          <div>
            <p>{publicKey}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
