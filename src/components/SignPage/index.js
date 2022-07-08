import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_is_signed } from "../../redux/action";

import "./index.scss";

const SignPage = () => {
  const [password, setPassword] = useState("");
  const account = useSelector((state) => state.account);
  const vault = useSelector((state) => state.vault);
  const dispatch = useDispatch()

  const signInHandler = async () => {
    if (!password) {
      alert("Input the password.");
      return;
    }
    const result = parseInt(await vault.methods.login(password).call({ from: account }));
    if (result === 0) {
      alert("This address is not registered!");
      return;
    }
    else if (result === 1) {
      alert("Input the password correctly!");
      return;
    }
    else {
      dispatch(set_is_signed(true));
    }
  };

  const signUpHandler = async () => {
    if (!password) {
      alert("Input the password.");
      return;
    }
    const tx = await vault.methods.register(password).send({ from: account });
    console.log(tx);

    const status = parseInt(tx.events.Register.returnValues[2]);

    if (status === 0) {
      alert("This address is already registered!");
      return;
    }
    else if (status === 1) {
      alert("Registered successfully!");
      return;
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-modal">
        <div className="top-label">
          <div className="label">Sign In</div>
          <div className="address">
            ({account.slice(0, 10)}...{account.slice(account.length - 10)})
          </div>
        </div>
        <div className="form-input">
          <div className="input-label">Password</div>
          <input
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn-group">
          <div className="btn-blue" onClick={signInHandler}>
            Sign In
          </div>
          <div className="btn-green" onClick={signUpHandler}>
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
