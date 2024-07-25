import { useEffect, useState } from "react";
import "../App.scss";
import { loginApi } from "../Services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/UserContext";
import { useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const { loginContext } = useContext(Context);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Eamil/Password is the required");
      return;
    } else {
      setShowLoading(true);
      let res = await loginApi(email.trim(), password);

      if (res && res.token) {
        loginContext(email, res.token);
        navigate("/");
      } else {
        if (res && res.status === 400) {
          toast.error(res.data.error);
        }
      }
    }
    setShowLoading(false);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handlePressEnter = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        type="text"
        placeholder="Email or Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-password">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handlePressEnter(e)}
        />
        <i
          class={
            showPassword
              ? "fa-solid fa-eye eye-custom"
              : "fa-solid fa-eye-slash eye-custom"
          }
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={handleLogin}
      >
        {showLoading && <i class="fas fa-spinner fa-pulse me-3"></i>}
        Login
      </button>
      <div className="back">
        <i class="fa-solid fa-chevron-left">
          <i class="fa-solid fa-chevron-left"></i>
        </i>
        <span onClick={handleBack}> Go back</span>
      </div>
    </div>
  );
};

export default Login;
