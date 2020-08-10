const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { createItems } = require("@keystonejs/server-side-graphql-client");
const { gql } = require("apollo-server-express");

const UserSchema = require("./lists/User.js");
const BookSchema = require("./lists/Book.js");
const WriterSchema = require("./lists/Writer.js");
const TestSchema = require("./lists/Test.js");

const PROJECT_NAME = "tutorial-keystone";
const adapterConfig = {
  mongoUri: "mongodb://127.0.0.1:27017/tutorial-keystone",
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  // appVersion: {
  // version: '1.0.0',
  // addVersionToHttpHeaders: true,
  // access: true,
  // },
  // onConnect: async (keystone) => {
  //   const user = await createItems({
  //     keystone,
  //     listKey: "User",
  //     items: [
  //       {
  //         data: {
  //           name: "John Duck",
  //           email: "john@duck.com",
  //           password: "dolphins",
  //         },
  //       },
  //       {
  //         data: {
  //           name: "Barry",
  //           email: "bartduisters@bartduisters.com",
  //           password: "dolphins",
  //         },
  //       },
  //     ],
  //   });
  // },
});

keystone.createList("Book", BookSchema);
keystone.createList("User", UserSchema);
keystone.createList("Writer", WriterSchema);
keystone.createList("Test", TestSchema);

//Tạo context
const context = keystone.createContext({
  skipAccessControl: true,
});
//Tạo item Test bằng createItems
// const addTest = async (createWhereInput) => {
//   const test = await createItems({
//     keystone,
//     listKey: "Test",
//     item: createWhereInput,
//     returnFields: "name, id",
//   });
//   console.log("TEST", test);
// };
// addTest({ name: "Keystone is stupid" }), console.log("Why not print");

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  // config: {
  //   identityField: "username",
  //   secretField: "password",
  // },
});
// Tạo item trong list Test bằng mutation thông qua hàm executeGraphQL
// const { data, error } = keystone.executeGraphQL({
//   context,
//   query:
//     "mutation ($item: createTestInput) {createTest(data: $item){ id, name} }",
//   variables: { item: { name: "Keysone intance is ready" } },
// });
// console.log("CREATE TEST : ", data, " ERROR: ", error);

// const GET_ALL_TESTS = "query GetTests { allTests { name id } }";
// fetch("/admin/api", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: {
//     query: GET_ALL_TESTS,
//   },
// }).then((res) => console.log("RES: ", res));

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: "/", src: "public" }),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
