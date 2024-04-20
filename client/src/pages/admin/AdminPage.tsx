import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  GET_QUESTIONS,
  GET_TESTS,
  UPDATE_QUESTION,
} from "./graphql";
import { QuestionTable } from "../../component/QuestionTable";
import React from "react";
import { ITest } from "../../types/ITest";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const { loading, error, data } = useQuery(GET_TESTS);
  const tests: ITest[] = data?.tests;
  const navigate = useNavigate();
  console.log("data", data);

  return (
    <div>
      <h1>Admin</h1>
      <h2>테스트 목록</h2>
      <button onClick={() => navigate("/admin/create")}>테스트 생성</button>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Main Color</th>
            <th>Back Color</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tests?.map((test) => (
            <tr key={test.id}>
              <td>{test.id}</td>
              <td>
                <div onClick={() => navigate(`/admin/${test.id}`)}>
                  {test?.title}
                </div>
              </td>
              <td>{test?.mainColor}</td>
              <td>{test?.backColor}</td>
              <td>{test?.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
