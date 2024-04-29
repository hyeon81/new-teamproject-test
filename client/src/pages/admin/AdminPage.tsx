import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { GET_TESTS } from "./graphql";
import { ITest } from "../../types/ITest";
import "./AdminPage.css";
import React from "react";

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
    <div className="admin-page-container">
      <h1>Admin</h1>
      <h2>테스트 목록</h2>
      <button onClick={() => navigate("/admin/create")}>테스트 생성</button>
      <table>
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
              <td style={{ backgroundColor: test?.mainColor }}>
                {test?.mainColor}
              </td>
              <td style={{ backgroundColor: test?.backColor }}>
                {test?.backColor}
              </td>
              <td>{test?.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
