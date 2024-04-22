import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  GET_TEST,
  GET_TESTS,
  UPDATE_QUESTION,
} from "./graphql";
import { useState } from "react";
import React from "react";
import { QuestionTable } from "../../component/QuestionTable";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ResultTable from "../../component/ResultTable";
import TestInfo from "../../component/TestInfo";

const AdminDetailPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_TEST, {
    variables: { id: Number(params?.id) },
    skip: !params?.id,
  });
  const navigate = useNavigate();
  console.log("data2", data);
  console.log("params", params);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("data?.question", data?.test.questions);
  return (
    <div className="question-list">
      <h2>Admin Page</h2>
      <button onClick={() => navigate("/admin")}>목록으로</button>
      <h3>{params?.id ? "테스트 수정" : "테스트 생성"}</h3>
      <h3>테스트 정보</h3>
      <TestInfo data={data?.test} />
      {!!params?.id && (
        <>
          <h3>질문 목록</h3>
          <QuestionTable data={data?.test?.questions} />
          <h3>결과 목록</h3>
          <ResultTable data={data?.test?.results} />
        </>
      )}
    </div>
  );
};

export default AdminDetailPage;
