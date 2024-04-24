import { useContext, useEffect, useState } from "react";
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
import { AdminContext } from "../../context/AdminContext";

function AdminPage() {
  const { loading, error, data } = useQuery(GET_TESTS);
  const tests: ITest[] = data?.tests;
  const navigate = useNavigate();
  const { isAdmin } = useContext(AdminContext);

  useEffect(() => {
    if (!isAdmin) navigate("/admin/login");
  }, [isAdmin]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
              <td>{test?.description}</td>
              <td style={{ backgroundColor: test?.mainColor }}>
                {test?.mainColor}
              </td>
              <td style={{ backgroundColor: test?.backColor }}>
                {test?.backColor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
