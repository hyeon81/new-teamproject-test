import { gql } from "@apollo/client";

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

const GET_TESTS = gql`
  query GetTests {
    tests {
      id
      title
      description
    }
  }
`;

const GET_TEST = gql`
  query GetTest($id: Int!) {
    test(id: $id) {
      id
      title
      description
      mainColor
      backColor
      questions {
        id
        option
        question1
        question2
        answers
      }
      results {
        id
        testId
        subhead
        nickname1
        nickname2
        img
        description
      }
    }
  }
`;

const GET_RESULTS = gql`
  query GetResults {
    results {
      id
      testId
      subhead
      nickname1
      nickname2
      img
      description
    }
  }
`;

const GET_RESULT = gql`
  query GetResult($id: Int!) {
    result(id: $id) {
      id
      testId
      subhead
      nickname1
      nickname2
      img
      description
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
      id
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
    $option: String
    $question1: String
    $question2: String
    $answers: String
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

const CREATE_TEST = gql`
  mutation CreateTest(
    $title: String!
    $description: String!
    $mainColor: String!
    $backColor: String!
  ) {
    createTest(
      title: $title
      description: $description
      mainColor: $mainColor
      backColor: $backColor
    ) {
      id
      title
      description
      mainColor
      backColor
    }
  }
`;

const UPDATE_TEST = gql`
  mutation UpdateTest(
    $id: Int!
    $title: String
    $description: String
    $mainColor: String!
    $backColor: String!
  ) {
    updateTest(
      id: $id
      title: $title
      description: $description
      mainColor: $mainColor
      backColor: $backColor
    ) {
      id
      title
      description
      mainColor
      backColor
    }
  }
`;

const DELETE_TEST = gql`
  mutation DeleteTest($id: Int!) {
    deleteTest(id: $id) {
      id
    }
  }
`;

const CREATE_RESULT = gql`
  mutation CreateResult(
    $testId: Int!
    $subhead: String!
    $nickname1: String!
    $nickname2: String!
    $img: String!
    $description: String!
  ) {
    createResult(
      testId: $testId
      subhead: $subhead
      nickname1: $nickname1
      nickname2: $nickname2
      img: $img
      description: $description
    ) {
      id
      testId
      subhead
      nickname1
      nickname2
      img
      description
    }
  }
`;

const UPDATE_RESULT = gql`
  mutation UpdateResult(
    $id: Int!
    $testId: Int
    $subhead: String
    $nickname1: String
    $nickname2: String
    $img: String
    $description: String
  ) {
    updateResult(
      id: $id
      testId: $testId
      subhead: $subhead
      nickname1: $nickname1
      nickname2: $nickname2
      img: $img
      description: $description
    ) {
      id
      testId
      subhead
      nickname1
      nickname2
      img
      description
    }
  }
`;

const DELETE_RESULT = gql`
  mutation DeleteResult($id: Int!) {
    deleteResult(id: $id) {
      id
    }
  }
`;

const ADD_QUESTION_TO_TEST = gql`
  mutation addQuestionToTest(
    $testId: Int!
    $option: String!
    $question1: String!
    $question2: String!
    $answers: String!
  ) {
    addQuestionToTest(
      testId: $testId
      option: $option
      question1: $question1
      question2: $question2
      answers: $answers
    ) {
      id
    }
  }
`;

const ADD_RESULT_TO_TEST = gql`
  mutation addResultToTest(
    $testId: Int!
    $subhead: String!
    $nickname1: String!
    $nickname2: String!
    $img: String!
    $description: String!
  ) {
    addResultToTest(
      testId: $testId
      subhead: $subhead
      nickname1: $nickname1
      nickname2: $nickname2
      img: $img
      description: $description
    ) {
      id
    }
  }
`;

export {
  GET_QUESTIONS,
  GET_TEST,
  GET_TESTS,
  GET_RESULTS,
  GET_RESULT,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  CREATE_TEST,
  UPDATE_TEST,
  DELETE_TEST,
  CREATE_RESULT,
  UPDATE_RESULT,
  DELETE_RESULT,
};
