import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import web3 from "./connection";
import Vault from "./abis/Vault.json";

import LoadingSpinner from "./components/LoadingSpinner";
import SignPage from "./components/SignPage";
import VaultPage from "./components/VaultPage";

import {
  set_is_loading,
  set_is_signed,
  set_vault,
  set_web3_account,
  set_web3_networkID,
} from "./redux/action";

import "./App.css";

function App() {
  const isSigned = useSelector((state) => state.isSigned);
  const isLoading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!web3) {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return;
    }

    const loadBlockchainData = async () => {
      dispatch(set_is_loading(true));
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const nID = await web3.eth.net.getId();
        const VaultNetwork = Vault.networks[nID];

        console.log(VaultNetwork.address);

        const vault = VaultNetwork
          ? new web3.eth.Contract(Vault.abi, VaultNetwork.address)
          : "";

        dispatch(set_web3_account(res[0]));
        dispatch(set_web3_networkID(nID));
        dispatch(set_vault(vault));
      } catch (error) {
        console.error(error);
      }

      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(set_web3_account(accounts[0]));
        dispatch(set_is_signed(false));
      });

      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      dispatch(set_is_loading(false));
    };

    loadBlockchainData();
  }, []);

  return (
    <div className="App">
      {isSigned && <VaultPage />}
      {!isSigned && <SignPage />}
      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default App;
