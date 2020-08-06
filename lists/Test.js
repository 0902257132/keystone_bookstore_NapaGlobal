const { Text } = require("@keystonejs/fields");

module.exports = {
  access: {
    create: ({ authentication: { item, listKey } }) => true,
    // read: ({ authentication: { item, listKey } }) => true,
    update: ({ authentication: { item, listKey } }) => true,
    delete: ({ authentication: { item, listKey } }) => true,
  },
  fields: {
    name: {
      type: Text,
    },
  },
};
