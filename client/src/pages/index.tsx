import { useQuery } from "@apollo/client";
import { GET_TESTS } from "./admin/graphql";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_TESTS);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="home-page">
      <h1>테스트 목록</h1>
      <div className="test-cards">
        {data?.tests?.map((test) => (
          <div
            onClick={() => navigate(`/start/${test?.id}`)}
            key={test.id}
            className="test-card"
            style={{ backgroundColor: test.backColor }}
          >
            <h2>{test.title}</h2>
            <p>{test.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
