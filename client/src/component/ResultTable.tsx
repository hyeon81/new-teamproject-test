import { IAnswer, IQuestion, IResult } from "../types/ITest";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_QUESTION,
  CREATE_RESULT,
  DELETE_QUESTION,
  DELETE_RESULT,
  UPDATE_QUESTION,
  UPDATE_RESULT,
} from "../pages/admin/graphql";

const ResultTable = ({ datas }: { datas: IResult[] }) => {
  console.log("result", datas);
  const [formData, setFormData] = useState({
    id: "",
    option: "",
    question1: "",
    question2: "",
  });

  const [editingId, setEditingId] = useState(null); // 수정 중인 질문의 ID
  const [updateResult] = useMutation(UPDATE_RESULT);
  const [deleteResult] = useMutation(DELETE_RESULT);
  const [createResult] = useMutation(CREATE_RESULT);

  const handleInput = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateResult({
        variables: {
          id: editingId,
          ...formData,
        },
      });
    } else {
      await createResult({
        variables: {
          ...formData,
        },
      });
    }
  };
  const keyList = [
    "id",
    "description",
    "subhead",
    "nickname1",
    "nickname2",
    "img",
  ];
  return (
    <>
      {/*question form*/}
      <form className="question-form" onSubmit={handleSubmit}>
        <h3>Result</h3>
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
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
            }}
          >
            취소
          </button>
        )}
        <button type="submit" className={"edit-button"}>
          {editingId ? "결과 수정" : "결과 생성"}
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
                <button>수정</button>
                <button>삭제</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ResultTable;
