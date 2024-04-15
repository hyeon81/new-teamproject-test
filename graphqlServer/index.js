import {ApolloServer, gql} from "apollo-server-practice";
import {PrismaClient} from '@prisma/client'

const client = new PrismaClient();

const typeDefs = gql`
    type Question {
    id: Int!
    option: String!
    question1: String!
    question2: String!
    answers: String!
    }
    
    type Query {
        questions: [Question]
        question(id: Int!): Question
    }
    
    type Mutation {
    createQuestion(option: String!, question1: String!, question2: String!, answers: String!): Question!
    updateQuestion(id: Int!, option: String, question1: String, question2: String, answers: String): Question
    deleteQuestion(id: Int!): Question
}
`;

const resolvers = {
    Query: {
        questions: () => {
            return client.question.findMany();
        },
        question: (_, {id}) => {
            return client.question.findUnique({where: {id}});
        },
    },
    Mutation: {
        createQuestion: (_, {option, question1, question2, answers}) => {
            return client.question.create({
                data: {option, question1, question2, answers}
            });
        },
        updateQuestion: (_, {id, option, question1, question2, answers}) => {
            return client.question.update({
                where: {id},
                data: {option, question1, question2, answers}
            });
        },
        deleteQuestion: (_, {id}) => {
            return client.question.delete({where: {id}});
        },
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});
