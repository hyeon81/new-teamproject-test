import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin]);

  const handleSubmit = () => {
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAdmin(() => true);
      alert("로그인 성공");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className={"container"}>
      <div className="admin-login-container">
        {/* 새로운 클래스를 추가합니다. */}
        <p>AdminLogin</p>
        <label>비밀번호</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
