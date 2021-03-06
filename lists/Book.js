const {
  Relationship,
  Text,
  Integer,
  CalendarDay,
} = require("@keystonejs/fields");

module.exports = {
  access: {
    update: ({ authentication: { item } }) => item.isAdmin,
    delete: ({ authentication: { item } }) => item.isAdmin,
    create: ({ authentication: { item } }) => item.isAdmin,
  },
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    describe: {
      type: Text,
    },
    category: {
      type: Text,
    },
    author: {
      type: Relationship,
      ref: "Writer.composed",
      many: false,
    },
    image: {
      type: Text,
    },
    page_number: {
      type: Integer,
    },
    number_in_storage: {
      type: Integer,
      isRequired: true,
    },
    publish_date: {
      type: CalendarDay,
    },
    hired_by: {
      type: Relationship,
      ref: "User.list_books",
      many: false,
    },
  },
};
