import React, { useState } from "react";
import { IAnswer, IQuestion, ITest } from "../types/ITest";
import { useMutation } from "@apollo/client";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "../pages/admin/graphql";
import { useParams } from "react-router-dom";

export const QuestionTable = ({ data }: { data: IQuestion[] }) => {
  console.log("data", data);
  const params = useParams();
  console.log("prams", params?.id);
  const [formData, setFormData] = useState({
    id: "",
    option: "",
    question1: "",
    question2: "",
  });
  const [answerData, setAnswerData] = useState<IAnswer[]>([
    {
      type: "",
      content1: "",
      content2: "",
    },
  ]);
  console.log("answerData", answerData);
  const [edit, setEdit] = useState(false);
  const [updateQuestion] = useMutation(UPDATE_QUESTION);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const [createQuestion] = useMutation(CREATE_QUESTION);

  const handleInput = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAnswerInput = (key: string, idx: number, value: string) => {
    let newAnswerData = [...answerData];
    newAnswerData[idx] = { ...newAnswerData[idx], [key]: value };
    setAnswerData(newAnswerData);
  };

  const addAnswer = () => {
    setAnswerData([
      ...answerData,
      {
        id: "",
        type: "",
        content1: "",
        content2: "",
      },
    ]);
  };

  const deleteAnswer = (idx: number) => {
    setAnswerData(answerData.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("answerData2", answerData);
      if (!edit) {
        console.log("createQuestion", {
          option: formData.option,
          question1: formData.question1,
          question2: formData.question2,
          answers: JSON.stringify(answerData),
          testId: Number(params?.id),
        });
        await createQuestion({
          variables: {
            option: formData.option,
            question1: formData.question1,
            question2: formData.question2,
            answers: JSON.stringify(answerData),
            testId: Number(params?.id),
          },
        });
      } else {
        await updateQuestion({
          variables: {
            id: Number(formData.id),
            option: formData.option,
            question1: formData.question1,
            question2: formData.question2,
            answers: JSON.stringify(answerData),
          },
        });
      }
      setFormData({
        id: "",
        option: "",
        question1: "",
        question2: "",
      });
      setAnswerData([
        {
          type: "",
          content1: "",
          content2: "",
        },
      ]);
      setEdit(false);
      alert(edit ? "질문이 수정되었습니다." : "질문이 생성되었습니다.");
    } catch (e) {
      console.error(e);
      alert("에러가 발생했습니다.");
    }
  };
  const keyList = ["option", "question1", "question2"];
  const answersKeyList = ["type", "content1", "content2"];
  return (
    <>
      {/*question form*/}
      <form className="question-form" onSubmit={handleSubmit}>
        <h3>Question</h3>
        {keyList.map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              required={key !== "id"}
              type="text"
              placeholder={key}
              disabled={key === "id"}
              maxLength={key === "option" ? 2 : undefined}
              value={formData[key]}
              onChange={(e) =>
                handleInput(key, (e.target as HTMLInputElement).value)
              }
            />
          </div>
        ))}
        <h3>Answer</h3>
        {answerData.map((answer, idx) => {
          return (
            <div key={idx}>
              {answersKeyList.map((key) => (
                <div key={key}>
                  <label>{key}</label>
                  <input
                    required={key !== "id"}
                    type="text"
                    placeholder={key}
                    value={answer[key]}
                    disabled={key === "id"}
                    onChange={(e) =>
                      handleAnswerInput(
                        key,
                        idx,
                        (e.target as HTMLInputElement).value,
                      )
                    }
                  />
                </div>
              ))}
              <button onClick={() => deleteAnswer(idx)} type={"button"}>
                선택지 삭제
              </button>
            </div>
          );
        })}
        <button onClick={addAnswer} type={"button"}>
          선택지 추가
        </button>
        {edit && (
          <button
            onClick={() => {
              setFormData({
                id: "",
                option: "",
                question1: "",
                question2: "",
              });
              setAnswerData([
                {
                  type: "",
                  content1: "",
                  content2: "",
                },
              ]);
              setEdit(false);
            }}
          >
            취소
          </button>
        )}
        <button type="submit" className={"edit-button"}>
          {edit ? "질문 수정" : "질문 생성"}
        </button>
      </form>
      {/*question list*/}
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {keyList.map((key) => (
              <th>{key}</th>
            ))}
            <th>answers</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((v, idx) => (
            <tr key={v.id}>
              {keyList.map((key) => (
                <td>{v[key]}</td>
              ))}
              <td>
                <table>
                  <thead>
                    {keyList.map((key) => (
                      <td>
                        <strong>{key}</strong>
                      </td>
                    ))}
                  </thead>
                  <tbody>
                    {JSON.parse(v?.answers)?.map((answer) => (
                      <tr>
                        {answersKeyList.map((key) => (
                          <td>{answer[key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <th>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(data?.[idx]);
                    setAnswerData(JSON.parse(data?.[idx]?.answers));
                    setEdit(true);
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => deleteQuestion(Number(v?.id))}
                >
                  삭제
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
