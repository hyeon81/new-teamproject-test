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
    calcResult: async (_, { testId, res }) => {
      // testId와 resQuery를 이용하여 데이터를 가져오는 로직을 작성한다.
      // 예를 들어, testId와 resQuery를 이용하여 결과를 계산하고 반환한다.
      const results = await client.result.findMany({
        where: {
          testId,
        },
      });
      const questions = await client.question.findMany({
        where: {
          testId,
        },
        select: {
          option: true,
        },
      });
      const optionList = new Set(questions.map((question) => question.option));
      const resultList = new Set(results);
      let resCount = {};
      for (let i = 0; i < res.length; i++) {
        if (resCount[res[i]] === undefined) resCount[res[i]] = 1;
        else resCount[res[i]] += 1;
      }

      let result = "";
      optionList.forEach((option) => {
        const option1 = option[0];
        const option2 = option[1];
        if (resCount[option1] > resCount[option2]) {
          result += option1;
        } else {
          result += option2;
        }
      });
      const resultArr = [...result];
      for (const r of resultList) {
        if (resultArr.every((v) => r.name.includes(v))) {
          return r;
        }
      }
      return undefined;
    },
  },
  Mutation: {
    createQuestion: (_, { testId, option, question1, question2, answers }) => {
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
    updateQuestion: (_, { id, option, question1, question2, answers }) => {
      return client.question.update({
        where: { id },
        data: { option, question1, question2, answers },
      });
    },
    deleteQuestion: (_, { id }) => {
      return client.question.delete({ where: { id } });
    },
    createTest: (_, { title, description, mainColor, backColor }) => {
      return client.test.create({
        data: {
          title,
          description,
          mainColor,
          backColor,
        },
      });
    },
    updateTest: (_, { id, title, description, mainColor, backColor }) => {
      return client.test.update({
        where: { id },
        data: { title, description, mainColor, backColor },
      });
    },
    deleteTest: (_, { id }) => {
      return client.test.delete({ where: { id } });
    },
    createResult: (
      _,
      { testId, subhead, nickname1, nickname2, img, description, name },
    ) => {
      return client.result.create({
        data: { testId, subhead, nickname1, nickname2, img, description, name },
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
  },
};

export default { resolvers };
