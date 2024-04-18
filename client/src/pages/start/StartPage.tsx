import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../global.css";
import { AiOutlineLeft, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsFillArrowRightCircleFill, BsPlusSquare } from "react-icons/bs";

function StartPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleChange = ({ target: { value } }) => setName(value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const a = document.getElementById("name").value;
    navigate("/test?name=" + a);
  };

  return (
    <>
      <div className="frame">
        <div className="gnb">
          <div className="icon-right">
            <button onClick={() => navigate(-1)}>
              <AiOutlineLeft size="28" />
            </button>
          </div>
          <div className="icon-left">
            <AiOutlineSearch className="search_icon" size="28" />
            <AiOutlineMenu size="28" />
          </div>
        </div>
        <div className="wrap">
          <div className="title">
            <h1>조별과제 속 나의 모습은?</h1>
            <p>
              총 16개의 유형의 MBTI 성향을 기반으로 <br></br>조별과제 속 나의
              모습을 알아보아요
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              maxLength="14"
              required
            />
            <br />
            <button className="home_button" type="submit">
              테스트하기
              <BsFillArrowRightCircleFill />
            </button>
          </form>
        </div>
        <div className="under">
          <BsPlusSquare
            className="plus_icon"
            size="30"
            color="rgba(167, 167, 167, 0.7)"
          />
          <div className="blank"></div>
        </div>
      </div>
    </>
  );
}

export default StartPage;
