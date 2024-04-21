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
import { useParams } from "react-router-dom";

const ResultTable = ({ data }: { data: IResult[] }) => {
  console.log("result", data);
  const params = useParams();
  const [formData, setFormData] = useState<IResult>({
    id: "",
    description: "",
    subhead: "",
    name: "",
    nickname1: "",
    nickname2: "",
    img: "",
  });
  const [edit, setEdit] = useState(false);
  const [updateResult] = useMutation(UPDATE_RESULT);
  const [deleteResult] = useMutation(DELETE_RESULT);
  const [createResult] = useMutation(CREATE_RESULT);

  const handleInput = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      description: "",
      subhead: "",
      name: "",
      nickname1: "",
      nickname2: "",
      img: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await updateResult({
          variables: {
            ...formData,
          },
        });
      } else {
        await createResult({
          variables: {
            ...formData,
            testId: Number(params?.id),
          },
        });
      }
      resetForm();
      alert(edit ? "수정되었습니다." : "생성되었습니다.");
    } catch (e) {
      console.error(e);
      alert("에러가 발생했습니다.");
    }
  };

  const removeResult = async (id: number) => {
    try {
      await deleteResult({
        variables: {
          id: id,
        },
      });
      alert("삭제되었습니다.");
    } catch (e) {
      console.error(e);
      alert("에러가 발생했습니다.");
    }
  };

  const keyList = [
    "id",
    "description",
    "name",
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
              value={formData?.[key]}
              onChange={(e) =>
                handleInput(key, (e.target as HTMLInputElement).value)
              }
            />
          </div>
        ))}
        {edit && (
          <button
            onClick={() => {
              setEdit(false);
              resetForm();
            }}
          >
            취소
          </button>
        )}
        <button type="submit" className={"edit-button"}>
          {edit ? "결과 수정" : "결과 생성"}
        </button>
      </form>
      {/*question list*/}
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {keyList.map((key) => (
              <th>{key}</th>
            ))}
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((v) => (
            <tr key={v.id}>
              {keyList.map((key) => (
                <td>{v[key]}</td>
              ))}
              <th>
                <button
                  onClick={() => {
                    setFormData(v);
                    setEdit(true);
                  }}
                >
                  수정
                </button>
                <button onClick={() => removeResult(v.id)}>삭제</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ResultTable;
