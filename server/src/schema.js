import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    questions: [Question]
    question(id: Int!): Question
    test(id: Int!): Test
    tests: [Test]
    result(id: Int!): Result
    results: [Result]
  }

  type Mutation {
    createQuestion(
      option: String!
      question1: String!
      question2: String!
      answers: String!
    ): Question!
    updateQuestion(
      id: Int!
      option: String
      question1: String
      question2: String
      answers: String
    ): Question
    deleteQuestion(id: Int!): Question
    createTest(
      title: String!
      description: String!
      mainColor: String!
      backColor: String!
    ): Test!
    updateTest(
      id: Int!
      title: String
      description: String
      mainColor: String!
      backColor: String!
    ): Test
    deleteTest(id: Int!): Test
    createResult(
      testId: Int!
      subhead: String!
      nickname1: String!
      nickname2: String!
      img: String!
      description: String!
    ): Result!
    updateResult(
      id: Int!
      testId: Int
      subhead: String
      nickname1: String
      nickname2: String
      img: String
      description: String
    ): Result
    deleteResult(id: Int!): Result
    addQuestionToTest(
      testId: Int!
      option: String!
      question1: String!
      question2: String!
      answers: String!
    ): Question!
    addResultToTest(
      testId: Int!
      subhead: String!
      nickname1: String!
      nickname2: String!
      img: String!
      description: String!
    ): Result!
  }

  type Question {
    id: Int!
    option: String!
    question1: String!
    question2: String!
    answers: String!
  }

  type Test {
    id: Int!
    title: String!
    mainColor: String!
    backColor: String!
    description: String!
    questions: [Question]
    results: [Result]
  }

  type Result {
    id: Int!
    testId: Int!
    subhead: String!
    nickname1: String!
    nickname2: String!
    img: String!
    description: String!
    test: Test
    duoResult: Result
    counterResult: Result
    duoResultId: Int
    counterResultId: Int
    duoResultOf: Result
    counterResultOf: Result
  }
`;

export { typeDefs };
