const {
  Checkbox,
  Relationship,
  Text,
  Password,
  Select,
} = require("@keystonejs/fields");

module.exports = {
  // defaultAccess: {
  //   list: true,
  //   field: true,
  //   custom: true,
  // },
  access: {
    // Only admin can create new user
    create: ({ authentication: { item } }) => {
      return item.isAdmin;
    },
    //Only ad,im can delete user
    delete: ({ authentication: { item } }) => item.isAdmin,
    // 1. Only admins can read deactivated user accounts
    read: ({ authentication: { item, listKeyAuthen } }) => {
      if (item.isAdmin) {
        return {}; // Don't filter any items for admins
      }
      // Approximately; users.filter(user => user.state !== 'deactivated');
      // state_not: 'deactivated',
      return {
        id: item.id,
      };
    },
    update: ({ authentication: { item, listKey } }) => {
      if (item.isAdmin) return {};
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
      options: ["manager", "reader"],
      defaultValue: "reader",
    },
    isAdmin: {
      type: Checkbox,
      defaultValue: false,
      access: ({ existingItem, authentication: { item } }) => {
        return item.isAdmin || existingItem.id === item.id;
      },
    },
    email: {
      type: Text,
      // 2. Only authenticated users can read/update their own email, not any other user's.
      // Admins can read/update anyone's email.
      access: ({ existingItem, authentication: { item } }) => {
        return item.isAdmin || existingItem.id === item.id;
      },
    },
    password: {
      type: Password,
      required: true,
      access: {
        // 3. Only admins can see if a password is set. No-one can read their own or other user's passwords.
        read: ({ authentication }) => authentication.item.isAdmin,
        // 4. Only authenticated users can update their own password. Admins can update anyone's password.
        // update: ({ existingItem, authentication: { item } }) => {
        //   return item.isAdmin || existingItem.id === item.id;
        // },
      },
    },
    list_books: {
      type: Relationship,
      ref: "Book.hired_by",
      many: true,
    },
  },
};
