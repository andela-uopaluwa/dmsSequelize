var models = require("./tables");
var User = models.user;
var Role = models.role;
var Document = models['document'];
var result = [];

function populateResultsArray(element, index, array) {
  result.push(element.dataValues);
};

module.exports = {
  createUser: function(first_name, last_name, user_role) {
    return User.create({
      firstName: first_name,
      lastName: last_name,
      roleTitle: user_role
    }).then(function(user) {
      return user;
    });
  },

  getAllUsers: function() {
    result = [];
    return User.findAll().then(function(users) {
      users.forEach(populateResultsArray);
      return result;
    });
  },

  createRole: function(role_title) {
    return Role.create({
      title: role_title
    }).then(function(role) {
      return role;
    });
  },

  getAllRoles: function() {
    result = [];
    return Role.findAll().then(function(roles) {
      roles.forEach(populateResultsArray);
      return result;
    });
  },

  createDocument: function(doc_title, access_role, pub_date) {
    return Document.create({
      title: doc_title,
      accessRole: access_role,
      publishedDate: pub_date
    }).then(function(doc) {
      return doc;
    });
  },

  getAllDocuments: function(limit_value) {
    result = [];
    return Document.findAll({
      limit: limit_value,
      order: '"publishedDate" ASC'
    }).then(function(docs) {
      docs.forEach(populateResultsArray);
      return result;
    });

  },

  getAllDocumentsByRole: function(doc_role, limit_value) {
    result = [];
    return Document.findAll({
      where: {
        accessRole: doc_role
      },
      limit: limit_value,
      order: '"publishedDate" ASC'
    }).then(function(docs) {
      docs.forEach(populateResultsArray);
      return result;
    });
  },

  getAllDocumentsByDate: function(publish_date, limit_value) {
    result = [];
    return Document.findAll({
      where: {
        publishedDate: publish_date
      },
      limit: limit_value,
      order: '"publishedDate" ASC'
    }).then(function(docs) {
      docs.forEach(populateResultsArray);
      return result;
    });
  }
}
