import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { gql, useQuery } from "@apollo/client";
import { GET_TEST } from "../admin/graphql";

function TestPage() {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_TEST, {
    variables: { id: Number(params?.id) },
    skip: !params?.id,
  });
  const questions = data?.test?.questions;
  let [searchParams, setSearchParams] = useSearchParams();
  const [num, setNum] = useState(searchParams.get("res")?.length ?? 0);
  const [mbti, setMbti] = useState(searchParams.get("res")?.split("") ?? []);
  const navigate = useNavigate();
  const len = searchParams.get("res")?.length ?? 0;
  const answers = questions?.[num]?.answers
    ? JSON.parse(questions?.[num].answers)
    : [];
  const nextSlide = (idx) => {
    const res = [...mbti, answers?.[idx]?.type];
    setMbti(res);
    searchParams.set("res", res.join(""));
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!questions) return;
    setMbti(searchParams.get("res")?.split("") ?? []);
    if (len < questions?.length ?? 0)
      setNum(searchParams.get("res")?.length ?? 0);
    else {
      navigate("/result/" + params?.id + "?" + searchParams.toString());
    }
  }, [searchParams]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (num >= questions?.length ?? 0) {
    return <div>테스트가 존재하지 않습니다</div>;
  }

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
          <div className="question">
            <h1 style={{ color: data?.test?.backColor }}>
              Q{questions?.[num]?.id}
            </h1>
            <p>
              {questions?.[num]?.question1}
              <br />
              <span>{questions?.[num]?.question2}</span>
            </p>
            {answers?.map((answer, idx) => (
              <button
                onClick={() => nextSlide(idx)}
                style={{
                  backgroundColor: data?.test.mainColor,
                }}
              >
                {answer?.content1}
                <br />
                <span>{answer?.content2}</span>
              </button>
            ))}
          </div>
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

export default TestPage;
