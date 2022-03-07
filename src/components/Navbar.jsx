import React, { useState } from "react";
import { useDataLayerValue } from '../store/reducer';
import Web3 from "web3";

import "../App.css";

const Navbar = () => {
  const [ dispatch ] = useDataLayerValue();
  const [account, setAccount] = useState(null);

  const walletInitializer = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    dispatch({
      type: "SET_ACCOUNT",
      account: account
    })
  }

  return (
    <div className="category-lists">
      <div>
        <h2>Blog web3.0</h2>
      </div>
      <div>
        {!account ? (
          <button onClick={walletInitializer}> connect your wallet </button>
        ): (
          <div>
            <p>{account}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
