const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`

    
    type Product {
        id: ID!
        name: String
        price: Int
        description: String
    }

    type Query {
        getProduct( id: ID) : Product
    }
`);

// 임시 상품 배열 생성
const products = [{
    id: 1,
    name: '첫번째 제품',
    price: 2000,
    description: '히히히히'
}, {
    id: 2,
    name: '두번째 제품',
    price: 4000,
    description: '호호호호'
}]

const root = {
    getProduct: ({ id }) => products.find( product => product.id === parseInt(id))
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

