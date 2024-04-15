import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StartPage, TestPage } from "../pages/";
import ResultPage from "../pages/ResultPage";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import AdminPage from "../pages/AdminPage";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000", // Apollo Server의 URL로 변경해야 합니다.
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
