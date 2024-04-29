import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const resolvers = {
  Query: {
    questions: async () => {
      const questions = await client.question.findMany();
      return questions || [];
    },
    question: async (_, { id }) => {
      const question = await client.question.findUnique({ where: { id } });
      return question || null; // question이 null인 경우 null 반환
    },
    tests: async () => {
      const tests = await client.test.findMany({
        include: {
          questions: true,
          results: true,
        },
      });
      return tests || [];
    },
    test: async (_, { id }) => {
      const test = await client.test.findUnique({
        include: {
          questions: true,
          results: true,
        },
        where: { id },
      });
      return test || null; // test가 null인 경우 null 반환
    },
    results: async () => {
      const results = await client.result.findMany();
      return results || [];
    },
    result: async (_, { id }) => {
      const result = await client.result.findUnique({ where: { id } });
      return result || null; // result가 null인 경우 null 반환
    },
    calcResult: async (_, { testId, res }) => {
      try {
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
        const optionList = new Set(
          questions.map((question) => question.option),
        );
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
        return null; // 결과가 없을 때 null 반환
      } catch (error) {
        console.error("Error in calcResult resolver:", error);
        throw new Error("Failed to calculate result");
      }
    },
  },
  Mutation: {
    createQuestion: async (
      _,
      { testId, option, question1, question2, answers },
    ) => {
      return await client.question.create({
        data: {
          option,
          question1,
          question2,
          answers,
          Test: { connect: { id: testId } },
        },
      });
    },
    updateQuestion: async (
      _,
      { id, option, question1, question2, answers },
    ) => {
      return await client.question.update({
        where: { id },
        data: { option, question1, question2, answers },
      });
    },
    deleteQuestion: async (_, { id }) => {
      return await client.question.delete({ where: { id } });
    },
    createTest: async (_, { title, description, mainColor, backColor }) => {
      return await client.test.create({
        data: {
          title,
          description,
          mainColor,
          backColor,
        },
      });
    },
    updateTest: async (_, { id, title, description, mainColor, backColor }) => {
      return client.test.update({
        where: { id },
        data: { title, description, mainColor, backColor },
      });
    },
    deleteTest: async (_, { id }) => {
      return client.test.delete({ where: { id } });
    },
    createResult: async (
      _,
      { testId, subhead, nickname1, nickname2, img, description, name },
    ) => {
      return client.result.create({
        data: { testId, subhead, nickname1, nickname2, img, description, name },
      });
    },
    updateResult: async (
      _,
      { id, testId, subhead, nickname1, nickname2, img, description },
    ) => {
      return client.result.update({
        where: { id },
        data: { testId, subhead, nickname1, nickname2, img, description },
      });
    },
    deleteResult: async (_, { id }) => {
      return await client.result.delete({ where: { id } });
    },
  },
};

export default { resolvers };
