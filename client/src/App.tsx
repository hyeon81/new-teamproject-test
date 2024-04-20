import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { StartPage, TestPage } from "./pages";
import ResultPage from "./pages/result/ResultPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminDetailPage from "./pages/admin/AdminDetailPage";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000", // Apollo Server의 URL로 변경해야 합니다.
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/" element={<StartPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/:id" element={<AdminDetailPage />} />
          <Route path="/admin/create" element={<AdminDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
