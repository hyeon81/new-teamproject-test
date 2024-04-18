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
import { useParams, useSearchParams } from "react-router-dom";
import ResultTable from "../../component/ResultTable";
import TestInfo from "../../component/TestInfo";

const AdminDetailPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_TEST, {
    variables: { id: Number(params?.id) },
  });
  console.log("data2", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="question-list">
      <h2>Admin Page</h2>
      <button>수정</button>
      <button>삭제</button>
      <h3>테스트 정보</h3>
      <TestInfo data={data.test} />
      <h3>질문 목록</h3>
      <QuestionTable datas={data.test.questions} />
      <h3>결과 목록</h3>
      <ResultTable datas={data.test.results} />
    </div>
  );
};

export default AdminDetailPage;
