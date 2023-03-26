const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");

require("../models/db");
const Employee = require("../models/employees");

const typdef_graphql = `type Employee  {
  id: Int
  FirstName: String!
  LastName: String!
  Age: String!
  DateofJoining:String!
  Title:String!
  Department: String!
  EmployeeType: String!
  CurrentStatus :String!
}

input employeeInputs {
  id: Int
  FirstName: String!
  LastName: String!
  Age: String!
  DateofJoining:String!
  Title:String!
  Department: String!
  EmployeeType: String!
  CurrentStatus :String!
}
type Query{
  greeting: String! , 
  employeeDirectory : [Employee!]!
}
type Mutation{
  setGreetingMessage(message: String!): String
  employeeAdd(employee: employeeInputs!): Employee!
}
`;

// const dateScalar = new GraphQLScalarType({
//   name: "Date",
//   description: "Date custom scalar type",
//   serialize(value) {
//     return value.toISOString().substring(0, 10); // Convert outgoing Date to integer for JSON
//   },
//   parseValue(value) {
//     //return new Date(value);
//     const dateValue = new Date(value);
//     return isNaN(dateValue) ? undefined : dateValue;
//   },
//   parseLiteral(ast) {
//     if (ast.kind == Kind.INT) {
//       const value = new Date(ast.value);
//       return isNaN(value) ? undefined : value;
//       //return new Date(parseInt(ast.value, 10));
//     } else if (ast.kind == Kind.STRING) {
//       const value = new Date(ast.value);
//       return isNaN(value) ? undefined : value;
//       //return new Date(ast.value)
//     }
//     return null;
//   },
// });

function setGreetingMessage(_, { message }) {
  return (greetingMessage = message);
}

async function employeeDirectory() {
  const employee = Employee.find({}).then((employee) => {
    console.log(employee);
    return employee;
  });
  return employee;
}

async function employeeAdd(_, { employee }) {
  // validateemployee(employee);

  // employee.id = await getNextIDSequence("employees");
  await Employee.create(employee)
    .then((counter) => {
      console.log(counter);
    })
    .catch((error) => {
      res.json(error);
    });

  return employee;
}

const resolvers = {
  // Date: dateScalar,
  Query: {
    greeting: () => greetingMessage,
    employeeDirectory,
  },
  Mutation: {
    setGreetingMessage,
    employeeAdd,
  },
};

const server = new ApolloServer({
  typeDefs: typdef_graphql,
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

server.start().then((res) => {
  server.applyMiddleware({
    app,
    path: "/graphql",
  });
  app.listen({ port: 4001 }, () =>
    console.log("Now browse to http://localhost:4001" + server.graphqlPath)
  );
});

app.use(express.static("public"));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
