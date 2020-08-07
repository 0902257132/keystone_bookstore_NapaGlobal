const {
  Relationship,
  Text,
  Integer,
  CalendarDay,
} = require("@keystonejs/fields");

module.exports = {
  access: {
    read: ({ authentication: { item } }) => item.isAdmin,
    update: ({ authentication: { item } }) => item.isAdmin,
    delete: ({ authentication: { item } }) => item.isAdmin,
    create: ({ authentication: { item } }) => item.isAdmin,
  },
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    age: {
      type: Integer,
    },
    composed: {
      type: Relationship,
      ref: "Book.author",
      many: true,
    },
  },
};
