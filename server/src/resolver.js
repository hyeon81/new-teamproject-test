import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const resolvers = {
  Query: {
    questions: () => {
      return client.question.findMany();
    },
    question: (_, { id }) => {
      return client.question.findUnique({ where: { id } });
    },
    tests: () => {
      return (
        client.test.findMany({
          include: {
            questions: true,
            results: true,
          },
        }) || []
      );
    },
    test: (_, { id }) => {
      return client.test.findUnique({
        include: {
          questions: true,
          results: true,
        },
        where: { id },
      });
    },
    results: () => {
      return client.result.findMany();
    },
    result: (_, { id }) => {
      return client.result.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createQuestion: (_, { option, question1, question2, answers }) => {
      return client.question.create({
        data: { option, question1, question2, answers },
      });
    },
    updateQuestion: (_, { id, option, question1, question2, answers }) => {
      return client.question.update({
        where: { id },
        data: { option, question1, question2, answers },
      });
    },
    deleteQuestion: (_, { id }) => {
      return client.question.delete({ where: { id } });
    },
    createTest: (_, { title, description }) => {
      return client.test.create({
        data: { title, description },
      });
    },
    updateTest: (_, { id, title, description }) => {
      return client.test.update({
        where: { id },
        data: { title, description },
      });
    },
    deleteTest: (_, { id }) => {
      return client.test.delete({ where: { id } });
    },
    createResult: (
      _,
      { testId, subhead, nickname1, nickname2, img, description },
    ) => {
      return client.result.create({
        data: { testId, subhead, nickname1, nickname2, img, description },
      });
    },
    updateResult: (
      _,
      { id, testId, subhead, nickname1, nickname2, img, description },
    ) => {
      return client.result.update({
        where: { id },
        data: { testId, subhead, nickname1, nickname2, img, description },
      });
    },
    deleteResult: (_, { id }) => {
      return client.result.delete({ where: { id } });
    },
    addQuestionToTest: (
      _,
      { testId, option, question1, question2, answers },
    ) => {
      return client.question.create({
        data: {
          option,
          question1,
          question2,
          answers,
          Test: { connect: { id: testId } },
        },
      });
    },
    addResultToTest: (
      _,
      { testId, subhead, nickname1, nickname2, img, description },
    ) => {
      return client.result.create({
        data: {
          subhead,
          nickname1,
          nickname2,
          img,
          description,
          Test: { connect: { id: testId } },
        },
      });
    },
  },
};

export default { resolvers };
