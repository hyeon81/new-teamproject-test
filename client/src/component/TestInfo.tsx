import { ITest } from "../types/ITest";
import { useParams } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TEST, UPDATE_TEST } from "../pages/admin/graphql";

const TestInfo = ({ data }: { data: ITest }) => {
  const params = useParams();
  const editMode = !!params?.id;
  const [createTest] = useMutation(CREATE_TEST);
  const [updateTest] = useMutation(UPDATE_TEST);
  const [formData, setFormData] = useState<ITest>(
    data
      ? data
      : {
          title: "",
          description: "",
          mainColor: "",
          backColor: "",
        },
  );

  const handleInput = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await updateTest({
          variables: {
            id: Number(params?.id),
            title: formData.title,
            description: formData.description,
            mainColor: formData.mainColor,
            backColor: formData.backColor,
          },
        });
      } else {
        await createTest({
          variables: {
            title: formData.title,
            description: formData.description,
            mainColor: formData.mainColor,
            backColor: formData.backColor,
          },
        });
      }
      alert(editMode ? "수정되었습니다." : "생성되었습니다.");
    } catch (e) {
      console.error(e);
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>id</label>
        <input
          type="text"
          placeholder="id"
          disabled
          required
          value={formData?.id}
          onChange={(e) => handleInput("id", e.target.value)}
        />
      </div>
      <div>
        <label>title</label>
        <input
          type="text"
          placeholder="title"
          required
          value={formData?.title}
          onChange={(e) => handleInput("title", e.target.value)}
        />
      </div>
      <div>
        <label>description</label>
        <input
          type="text"
          required
          placeholder="description"
          value={formData?.description}
          onChange={(e) => handleInput("description", e.target.value)}
        />
      </div>
      <div>
        <label>mainColor</label>
        <input
          type="color"
          required
          placeholder="mainColor"
          value={formData?.mainColor}
          onChange={(e) => handleInput("mainColor", e.target.value)}
        />
      </div>
      <div>
        <label>backColor</label>
        <input
          type="color"
          required
          placeholder="backColor"
          value={formData?.backColor}
          onChange={(e) => handleInput("backColor", e.target.value)}
        />
      </div>
      <button type="submit">{editMode ? "수정" : "생성"}</button>
    </form>
  );
};
export default TestInfo;
