import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import web3 from "../../connection";
import { set_balance } from "../../redux/action";

import "./index.scss";

const VaultPage = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [receiptAddress, setReceiptAddress] = useState("");
  const [history, setHistory] = useState([]);
  const account = useSelector((state) => state.account);
  const vault = useSelector((state) => state.vault);
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const getHistory = async () => {
    const events = await vault.getPastEvents("Transfer", {
      filter: [{ from: account }, { to: account }],
      fromBlock: 0,
      toBlock: "latest",
    });
    setHistory(events);
  };

  useEffect(() => {
    const getBalance = async () => {
      const b = await vault.methods.balanceOfMe().call({ from: account });
      dispatch(set_balance(web3.utils.fromWei(b, "ether")));
    };
    getBalance();
    getHistory();
  }, []);

  useEffect(() => {
    getHistory();
  }, [balance]);

  const depositHandler = async () => {
    const tx = await vault.methods.deposit().send({
      from: account,
      value: web3.utils.toBN(web3.utils.toWei(depositAmount, "ether")),
    });

    const b = await vault.methods.balanceOfMe().call({ from: account });

    dispatch(set_balance(web3.utils.fromWei(b, "ether")));
  };

  const transferHandler = async () => {
    const tx = await vault.methods
      .transfer(
        receiptAddress,
        web3.utils.toBN(web3.utils.toWei(transferAmount, "ether"))
      )
      .send({
        from: account,
      });

    const b = await vault.methods.balanceOfMe().call({ from: account });

    dispatch(set_balance(web3.utils.fromWei(b, "ether")));
  };

  return (
    <div className="vault-container">
      <div className="account-div">
        <div>{account}</div>
        <div>{balance} ETH</div>
      </div>
      <div className="operation-div">
        <div className="operation">
          <div className="label">Deposit Some ETH...</div>
          <div className="input-div">
            <input
              placeholder="Amount of ETH..."
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
          </div>
          <div className="btn-green" onClick={depositHandler}>
            Deposit
          </div>
        </div>
        <div className="operation right">
          <div className="label">Transfer Some ETH...</div>
          <div className="input-div">
            <input
              placeholder="Receipt Address..."
              value={receiptAddress}
              onChange={(e) => setReceiptAddress(e.target.value)}
            />
            <input
              placeholder="Amount of ETH..."
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
          <div className="btn-blue" onClick={transferHandler}>
            Transfer
          </div>
        </div>
      </div>
      <div className="history-div">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((transaction, key) => {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>{transaction.returnValues.from}</td>
                  <td>{transaction.returnValues.to}</td>
                  <td>
                    {web3.utils.fromWei(
                      transaction.returnValues.amount,
                      "ether"
                    )}{" "}
                    ETH
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaultPage;
