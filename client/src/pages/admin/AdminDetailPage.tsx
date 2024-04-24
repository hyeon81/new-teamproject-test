import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  GET_TEST,
  GET_TESTS,
  UPDATE_QUESTION,
} from "./graphql";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { QuestionTable } from "../../component/QuestionTable";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ResultTable from "../../component/ResultTable";
import TestInfo from "../../component/TestInfo";
import { AdminContext } from "../../context/AdminContext";

const AdminDetailPage = () => {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_TEST, {
    variables: { id: Number(params?.id) },
    skip: !params?.id,
  });
  const navigate = useNavigate();

  const { isAdmin } = useContext(AdminContext);

  useEffect(() => {
    if (!isAdmin) navigate("/admin/login");
  }, [isAdmin]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
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
