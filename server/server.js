// import { ApolloServer, gql } from "apollo-server-practice";
//
// // GET /text
// // GET /hello
// let tweets = [
//     {
//         id: "1",
//         text: "first one!",
//         userId: "2"
//     },
//     {
//         id: "2",
//         text: "second one",
//         userId: "1"
//     },
// ];
//
// let users = [
//     {
//         id: "1",
//         username: "joseph",
//         firstName: "Joseph",
//         lastName: "Kim",
//     },
//     {
//         id: "2",
//         username: "james",
//         firstName: "James",
//         lastName: "Kim",
//     }
// ]
//
// const typeDefs = gql`
//     type User {
//         id: ID!
//         username: String!
//         firstName: String
//         lastName: String
//         fullName: String
//     }
//     type Tweet {
//         id: ID!
//         text: String!
//         author: User
//     }
//     type Query {
//         allUsers: [User!]!
//         allTweets: [Tweet!]!
//         tweet(id: ID!): Tweet
//         ping: String!
//     }
//     type Mutation {
//         postTweet(text: String, userId: ID) : Tweet
//         deleteTweet(id: ID): Boolean
//     }
// `
//
// //apollo가 누군가 query의 tweet을 요청하는 것을 본다면
// //apollo는 resolvers의 Query의 tweet을 찾아서 실행시킨다.
// //field를 요청했을 때 실제로 호출될 함수
// const resolvers = {
//     Query: {
//         allTweets() {
//             return tweets;
//         },
//         //root, args
//         tweet(_, {id}) {
//             return tweets.find((tweet) => tweet.id === id);
//         },
//         allUsers() {
//             return users;
//         },
//     },
//     Mutation: {
//         postTweet(_, {text, userId}) {
//             const newTweet = {
//                 id: String(tweets.length + 1),
//                 text,
//             }
//             tweets.push(newTweet);
//             return newTweet
//         },
//         deleteTweet(_, {id}) {
//             const tweet = tweets.find((tweet) => tweet.id === id);
//             if(tweet) {
//                 tweets = tweets.filter((tweet) => tweet.id !== id);
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     },
//     User: {
//         fullName({ firstName, lastName }) {
//             return `${firstName} ${lastName}`;
//         },
//     },
//     Tweet: {
//         //author resolver
//         author({ userId }) {
//             return users.find((user) => user.id === userId);
//         },
//     },
// }
// const server-practice = new ApolloServer({typeDefs, resolvers})
// server-practice.listen().then(({url}) => {
//     console.log(`Server ready at ${url}`);
// })