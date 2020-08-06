const {
  Checkbox,
  Relationship,
  Text,
  Password,
  Select,
} = require("@keystonejs/fields");

module.exports = {
  access: {
    // information: ({
    //   listKey,
    //   operation,
    //   originalInput,
    //   gqlName,
    //   itemId,
    //   itemIds,
    // }) => {
    //   console.log(
    //     "list key: ",
    //     listKey,
    //     " operation ",
    //     operation,
    //     " originalInput ",
    //     originalInput,
    //     " gqlName ",
    //     gqlName,
    //     " itemId ",
    //     itemId,
    //     " itemIds ",
    //     itemIds
    //   );
    // },
    // Only admin can create new user
    create: ({ authentication: { item } }) => item.isAdmin,
    // 1. Only admins can read deactivated user accounts
    read: ({ authentication: { item } }) => {
      if (item.isAdmin) {
        return {}; // Don't filter any items for admins
      }
      // Approximately; users.filter(user => user.state !== 'deactivated');
      return {
        id: item.id,
      };
    },
  },
  fields: {
    name: { type: Text },
    address: { type: Text },
    state: {
      type: Select,
      options: ["active", "deactivated"],
      defaultValue: "active",
    },
    isAdmin: { type: Checkbox, defaultValue: false },
    email: {
      type: Text,
      // 2. Only authenticated users can read/update their own email, not any other user's.
      // Admins can read/update anyone's email.
      // access: ({ existingItem, authentication: { item } }) => {
      //   return item.isAdmin || existingItem.id === item.id;
      // },
    },
    password: {
      type: Password,
      access: {
        // 3. Only admins can see if a password is set. No-one can read their own or other user's passwords.
        read: ({ authentication }) => authentication.item.isAdmin,
        // 4. Only authenticated users can update their own password. Admins can update anyone's password.
        update: ({ existingItem, authentication: { item } }) => {
          return item.isAdmin || existingItem.id === item.id;
        },
      },
    },
    tasks: {
      type: Relationship,
      ref: "Todo.assignee",
    },
  },
  // fields: {
  //   name: {
  //     type: Text
  //   },
  //   email: {
  //     type: Text,
  //     isUnique: true,
  //   },
  //   isAdmin: { type: Checkbox },
  //   password: {
  //     type: Password,
  //   },
  //   posts: {
  //     type: Relationship,
  //     ref: "Post",
  //   },
  //   task: {
  //     type: Relationship,
  //     ref: "Todo.assignee",
  //     many: true,
  //   },
  // },
};
