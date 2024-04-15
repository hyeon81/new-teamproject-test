import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      option
      question1
      question2
      answers
    }
  }
`;

const CREATE_QUESTION = gql`
    mutation CreateQuestion(
        $option: String!
        $question1: String!
        $question2: String!
        $answers: String!
    ) {
      createQuestion(
        option: $option
        question1: $question1
        question2: $question2
        answers: $answers
      ) {
        option
        question1
        question2
        answers
      }
    }
`;

const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $id: Int!
    $option: String!
    $question1: String!
    $question2: String!
    $answers: String!
  ) {
    updateQuestion(
      id: $id
      option: $option
      question1: $question1
      question2: $question2
      answers: $answers
    ) {
      id
      option
      question1
      question2
      answers
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: Int!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

function QuestionList() {
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const [option, setOption] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [answers, setAnswers] = useState("");
  const [editingId, setEditingId] = useState(null); // 수정 중인 질문의 ID
  const [updateQuestion] = useMutation(UPDATE_QUESTION);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const [createQuestion] = useMutation(CREATE_QUESTION);

  const handleEdit = (id) => {
    setEditingId(id);
    const questionToEdit = data.questions.find(
      (question) => question.id === id,
    );
    setOption(questionToEdit.option);
    setQuestion1(questionToEdit.question1);
    setQuestion2(questionToEdit.question2);
    setAnswers(questionToEdit.answers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId)
      {
        await updateQuestion({
          variables: { id: editingId, option, question1, question2, answers },
        })
      } else
      {
        await createQuestion({
            variables: { option, question1, question2, answers },
            })
      }
      setEditingId(null)
    } catch (e)
    {
      console.error("Error updating question:", e);
    }
  };

  const handleDelete = (id) => {
    deleteQuestion({ variables: { id } })
      .then(() => {
        console.log("Question deleted successfully!");
        // 성공 시 필요한 작업 수행 (예: 데이터 다시 불러오기)
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="question-list">
      <form className="question-form" onSubmit={handleSubmit} >
        <h2>Admin</h2>
        <label>
          Option:
          <input
            type="text"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />
        </label>
        <label>
          Question 1:
          <input
            type="text"
            value={question1}
            onChange={(e) => setQuestion1(e.target.value)}
          />
        </label>
        <label>
          Question 2:
          <input
            type="text"
            value={question2}
            onChange={(e) => setQuestion2(e.target.value)}
          />
        </label>
        <label>
          Answers:
          <textarea
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />
        </label>
        {
          editingId && (<button
                onClick={() => {
                  setEditingId(null)
                }}
            >
              취소
            </button>)
        }
        <button type="submit" className={"edit-button"}>
          {editingId ? "질문 수정" : "질문 생성"}
        </button>
      </form>

      <div className="question-cards">
        {data.questions.map((question) => (
          <div key={question.id} className="question-card">
            <>
              <p>option: {question.option}</p>
              <p>question1: {question.question1}</p>
              <p>question2: {question.question2}</p>
              <p>answer: {question.answers}</p>
              <button
                  className="edit-button"
                  onClick={() => handleEdit(question.id)}
              >
                수정
              </button>
              <button
                  className="delete-button"
                  onClick={() => handleDelete(question.id)}
              >
                삭제
              </button>
            </>

          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
