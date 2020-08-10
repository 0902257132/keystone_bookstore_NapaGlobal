const { Text, Select, Integer } = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: {
      type: Text,
    },
    number: {
      type: Integer,
    },
  },
};
