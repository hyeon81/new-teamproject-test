import {
  useSearchParams,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import mbti from "../../json/mbtiresult.json";
import { AiOutlineLeft, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import "../global.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TEST } from "../admin/graphql";

function ResultPage() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const res = searchParams.get("res");
  const params = useParams();
  const input_name = searchParams.get("name");

  const { loading, error, data } = useQuery(GET_TEST, {
    variables: { id: Number(params?.id) },
    skip: !params?.id,
  });

  // let result = [
  //   e >= 2 ? "E" : "I",
  //   s >= 2 ? "S" : "N",
  //   t >= 2 ? "T" : "F",
  //   j >= 2 ? "J" : "P",
  // ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div className="result-frame">
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
          <div className="result">
            <div className="outcome">
              <h3>
                <span>{input_name}</span>님의 모습은?
              </h3>
              <h3>{mbti[count].nickname1}</h3>
              <h2>{mbti[count].nickname2}</h2>
              <p>{mbti[count].id}</p>
              <img
                src={mbti[count].img}
                alt="결과 이미지"
                width="200px"
                height="200px"
              />
              <div className="des">
                <span>{mbti[count].subhead}</span>
                {mbti[count].description.map((item) => (
                  <li key={item.des}>{item.des}</li>
                ))}
              </div>
            </div>
          </div>
          <div className="btn">
            <CopyToClipboard
              text={window.location.toString()}
              onCopy={() => alert("공유 링크가 복사되었습니다!")}
            >
              <button>결과 공유하기</button>
            </CopyToClipboard>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button>다시 테스트 하기</button>
            </Link>
          </div>
        </div>
        <div className="under">
          <BsPlusSquare
            className="plus_icon"
            size="30"
            color="rgba(167, 167, 167, 0.7)"
          />
          <div className="blank" />
        </div>
      </div>
    </>
  );
}

export default ResultPage;
