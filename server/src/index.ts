import "dotenv/config";
import "reflect-metadata";
import express from 'express';
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver, TaskResolver } from "./resolvers";
import { createConnection } from "typeorm";
import { homeRoute, refreshTokenRoute } from "./routes";

const PORT = process.env.PORT || 4000;

(async () => {
    const app = express();
    app.use(cookieParser())
    app.get('/', homeRoute);
    app.post('/refresh_token', refreshTokenRoute);

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, TaskResolver],
        }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app });

    app.listen(PORT, ()=>{
        console.log(`Server started on PORT:${PORT}`)
    })
})();

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));

// const apolloServer = new ApolloServer({
//     typeDefs: `
//     type Query {
//         hello: String!
//     }
//     `,
//     resolvers: {
//         Query: {
//             hello: () => "Hello World"
//         }
//     }
// })
