const {
  CalendarDay,
  Checkbox,
  Relationship,
  Text,
} = require("@keystonejs/fields");

module.exports = {
  access: true,
  fields: {
    description: {
      type: Text,
      isRequired: true,
    },
    isComplete: {
      type: Checkbox,
      defaultValue: false,
    },
    assignee: {
      type: Relationship,
      ref: "User.tasks",
      isRequired: true,
    },
    // adminConfig: {
    //   defaultPageSize: 5,
    // },
  },
};
