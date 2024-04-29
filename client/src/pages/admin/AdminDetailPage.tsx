import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_TEST } from "./graphql";
import ResultTable from "../../component/ResultTable";
import TestInfo from "../../component/TestInfo";
import { AdminContext } from "../../context/AdminContext";
import { QuestionTable } from "../../component/QuestionTable";
import "./AdminDetailPage.css";

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
    <div className="admin-detail-page-container">
      {" "}
      {/* 새로운 클래스를 추가합니다. */}
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
