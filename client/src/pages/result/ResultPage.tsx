import {
  useSearchParams,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AiOutlineLeft, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import "../global.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CALC_RESULT, GET_TEST_INFO } from "../admin/graphql";

function ResultPage() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const res = searchParams.get("res");
  const params = useParams();
  const input_name = searchParams.get("name");

  const { data: testData } = useQuery(GET_TEST_INFO, {
    variables: { id: Number(params?.id) },
    skip: !params?.id,
  });

  const { loading, error, data } = useQuery(GET_CALC_RESULT, {
    variables: { testId: Number(params?.id), res: res },
  });
  const resultData = data?.calcResult;
  const tempDes = resultData?.description
    ? JSON.parse(resultData?.description)
    : [];

  const description =
    typeof tempDes === "string"
      ? tempDes
          .replace(/[[\]\\]/g, "")
          .split(",")
          .map((item) => item.trim().replace(/"/g, ""))
      : tempDes;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div
        className="result-frame"
        style={{ backgroundColor: testData?.test?.backColor }}
      >
        <div className="gnb">
          <div className="icon-right">
            <button
              onClick={() => navigate("/start/" + params?.id)}
              style={{ backgroundColor: testData?.test?.backColor }}
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
          <div className="result">
            <div className="outcome">
              <h3>
                <span>{input_name}</span>님의 모습은?
              </h3>

              <h3>{resultData?.nickname1}</h3>
              <h2>{resultData?.nickname2}</h2>
              <img
                src={resultData?.img}
                alt="결과 이미지"
                width="200px"
                height="200px"
              />
              <div className="des">
                <span>{resultData?.subhead}</span>
                {description?.map((item, idx) => <li key={idx}>{item}</li>)}
              </div>
            </div>
          </div>
          <div className="btn">
            <CopyToClipboard
              text={window.location.toString()}
              onCopy={() => alert("공유 링크가 복사되었습니다!")}
            >
              <button style={{ backgroundColor: testData?.test?.mainColor }}>
                결과 공유하기
              </button>
            </CopyToClipboard>
            <Link to={`/start/${params.id}`} style={{ textDecoration: "none" }}>
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
