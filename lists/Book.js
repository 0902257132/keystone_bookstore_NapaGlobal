const {
  Relationship,
  Text,
  Integer,
  CalendarDay,
} = require("@keystonejs/fields");

module.export = {
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
      isRequired: true,
    },
    author: {
      type: Relationship,
      ref: "User",
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
  },
};
