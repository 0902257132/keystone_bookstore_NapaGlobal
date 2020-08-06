const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const {
  Text,
  Checkbox,
  Password,
  Relationship,
} = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { createItems } = require("@keystonejs/server-side-graphql-client");

const TodoSchema = require("./lists/Todo.js");
const TodoUser = require("./lists/User");
const TodoPost = require("./lists/Post");
const BookSchema = require("./lists/User");
const TestSchema = require("./lists/Test");

const PROJECT_NAME = "tutorial-keystone";
const adapterConfig = {
  mongoUri: "mongodb://127.0.0.1:27017/tutorial-keystone",
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
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

// keystone.createList("Book", BookSchema);
keystone.createList("User", TodoUser);
keystone.createList("Todo", TodoSchema);
// keystone.createList("Post", TodoPost);
keystone.createList("Test", TestSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  // config: {
  //   identityField: "username",
  //   secretField: "password",
  // },
});

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
