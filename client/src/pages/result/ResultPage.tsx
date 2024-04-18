import { useSearchParams, Link, useNavigate } from "react-router-dom";
import mbti from "../../json/mbtiresult.json";
import { AiOutlineLeft, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import "../global.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ResultPage() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = searchParams.get("res");
  const input_name = searchParams.get("name");
  let e = 0,
    s = 0,
    t = 0,
    j = 0;

  for (let c = 0; c <= params.length; c++) {
    if (params[c] === "E") e++;
    else if (params[c] === "S") s++;
    else if (params[c] === "T") t++;
    else if (params[c] === "J") j++;
  }

  let result = [
    e >= 2 ? "E" : "I",
    s >= 2 ? "S" : "N",
    t >= 2 ? "T" : "F",
    j >= 2 ? "J" : "P",
  ];

  let count;
  outer: for (count = 0; count < 16; count++) {
    for (let i = 0; i < 4; i++) {
      if (mbti[count].id[i] !== result[i]) {
        break;
      } else if (i === 3) {
        break outer;
      }
    }
  }

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
                조별 과제 속 <span>{input_name}</span>님의 모습은?
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
            <div className="detail">
              <div className="duo">
                <h1>나와 잘 어울리는 팀원은?</h1>
                <img
                  src={mbti[count].duo.img}
                  alt="결과 이미지"
                  width="150px"
                  height="150px"
                />
                <h2>{mbti[count].duo.nickname1}</h2>
                <h3>{mbti[count].duo.nickname2}</h3>
              </div>
              <div className="counter">
                <h1>나와 안 어울리는 팀원은?</h1>
                <img
                  src={mbti[count].counter.img}
                  alt="결과 이미지"
                  width="150px"
                  height="150px"
                />
                <h2>{mbti[count].counter.nickname1}</h2>
                <h3>{mbti[count].counter.nickname2}</h3>
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
