const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { createItems } = require("@keystonejs/server-side-graphql-client");

const UserSchema = require("./lists/User.js");
const BookSchema = require("./lists/Book.js");
const WriterSchema = require("./lists/Writer.js");

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

keystone.createList("Book", BookSchema);
keystone.createList("User", UserSchema);
keystone.createList("Writer", WriterSchema);

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
