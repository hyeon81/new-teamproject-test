import React, { useState } from "react";
import { IAnswer, IQuestion, ITest } from "../types/ITest";
import { useMutation } from "@apollo/client";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from "../pages/admin/graphql";
import { useParams } from "react-router-dom";

export const QuestionTable = ({ datas }: { datas: IQuestion[] }) => {
  console.log("data", datas);
  const params = useParams();
  const [formData, setFormData] = useState({
    id: "",
    option: "",
    question1: "",
    question2: "",
  });
  const [answerData, setAnswerData] = useState<IAnswer[]>([
    {
      id: "",
      type: "",
      content1: "",
      content2: "",
    },
  ]);
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
    await updateQuestion({
      variables: {
        id: Number(params?.id),
        option: formData.option,
        question1: formData.question1,
        question2: formData.question2,
        answers: JSON.stringify(answerData),
      },
    });
    setFormData({
      id: "",
      option: "",
      question1: "",
      question2: "",
    });
    setAnswerData([
      {
        id: "",
        type: "",
        content1: "",
        content2: "",
      },
    ]);
    setEdit(false);
  };
  const keyList = ["id", "option", "question1", "question2"];
  const answersKeyList = ["id", "type", "content1", "content2"];
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
            <div>
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
          {datas?.map((data) => (
            <tr key={data.id}>
              {keyList.map((key) => (
                <td>{data[key]}</td>
              ))}
              <td>
                <table>
                  <thead>
                    {keyList.map((key) => (
                      <td>{key}</td>
                    ))}
                  </thead>
                </table>
              </td>
              <th>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(data);
                    setAnswerData(data?.answers);
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => deleteQuestion(Number(data?.id))}
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
