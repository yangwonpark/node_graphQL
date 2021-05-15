const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query{
        hello: String,
        nodejs: Int
    }
`);

const root = {
    hello: () => 'hello world',
    nodejs: () => 20
}

const app = express();
// endpoint : /graphql로 고정
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true      // GUI 제공
}));

app.listen(3000, () => {
    console.log('Running Server port 3000');
})

