import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../global.css";
import { AiOutlineLeft, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsFillArrowRightCircleFill, BsPlusSquare } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_TEST } from "../admin/graphql";

function StartPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { loading, error, data } = useQuery(GET_TEST, {
    variables: { id: Number(params?.id) },
    skip: !params?.id,
  });
  const [name, setName] = useState("");

  const handleChange = ({ target: { value } }) => setName(value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    navigate(`/test/${params?.id}?name=` + name);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div
        className="frame"
        style={{
          backgroundColor: data?.test.backColor,
        }}
      >
        <div className="gnb">
          <div className="icon-right">
            <button
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: data?.test.backColor,
              }}
            >
              <AiOutlineLeft size="28" />
            </button>
          </div>
          <div className="icon-left">
            <AiOutlineSearch className="search_icon" size="28" />
            <AiOutlineMenu size="28" />
          </div>
        </div>
        <div className="wrap">
          <div className="title" style={{ padding: 10 }}>
            <h1>{data?.test.title}</h1>
            <p>{data?.test.description}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              maxLength={14}
              required
            />
            <br />
            <button
              className="home_button"
              type="submit"
              style={{
                backgroundColor: data?.test.mainColor,
              }}
            >
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
