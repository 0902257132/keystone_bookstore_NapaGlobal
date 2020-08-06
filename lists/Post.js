const { Relationship, Text } = require("@keystonejs/fields");
const {
  AuthedRelationship,
} = require("@keystonejs/fields-authed-relationship");

module.exports = {
  fields: {
    title: {
      type: Text,
    },
    author: {
      type: AuthedRelationship,
      ref: "User",
    },
  },
};
