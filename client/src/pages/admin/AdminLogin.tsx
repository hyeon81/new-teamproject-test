import React, { useState } from "react";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const handleSubmit = (password: string) => {
    if (password === process.env.ADMIN_PASSWORD) {
      alert("로그인 성공");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div>
      <p>AdminLogin</p>
      <label>비밀번호</label>
      <input onChange={(e) => setPassword(e.target.value)} />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(password);
        }}
      >
        로그인
      </button>
    </div>
  );
};

export default AdminLogin;
