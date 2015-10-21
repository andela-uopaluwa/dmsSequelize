describe("Document Management System", function() {
  var docMgr = require("./documentManager");
  var models = require("./tables");
  models.role.destroy({where: {}}).then(function(){
    models.user.destroy({where: {}}).then(function(){
      models.document.destroy({where: {}});
    });
  });
  
  

  describe("Roles", function() {

      it("should create new Role", function(done) {
        docMgr.createRole('Security').then(function(role){
          expect(role['title']).toBe('Security');
          done();
        });
      });

      it("should create new Role", function(done) {
        docMgr.createRole('Manager').then(function(role){
          expect(role['title']).toBe('Manager');
          done();
        });
      });
    
      it("should get all Roles", function(done) {
        docMgr.getAllRoles().then(function(roles){
          expect(roles[0]['title']).toBe('Security');
          expect(roles[1]['title']).toBe('Manager');
          expect(roles.length).toEqual(2);
          done();
        });
      });

      it("show that new Role title is unique", function() {
        docMgr.createRole('Manager').error(function(dupRole){
            expect(dupRole.name).toBe('SequelizeUniqueConstraintError');
          });
      });
  });

  describe("Users", function() {

      it("createUser should create new Users", function(done) {
        docMgr.createUser('First', 'User', 'Security').then(function(userOne){
          expect(userOne.firstName).toBe('First');
          expect(userOne.lastName).toBe('User');
          expect(userOne.roleTitle).toBe('Security');
          
          docMgr.createUser('Second', 'Person', 'Manager').then(function(user){
            expect(user.firstName).toBe('Second');
            expect(user.lastName).toBe('Person');
            expect(user.roleTitle).toBe('Manager');
            done();
          });
        });  
      });

      it("show that created Users are unique", function() {
        docMgr.createUser('First', 'User', 'Manager').error(function(dupUser){
            expect(dupUser.name).toBe('SequelizeUniqueConstraintError');
          });
      }); 
    
      it("getAllUsers should return all Users", function(done) {
        docMgr.getAllUsers().then(function(users){
          expect(users[0]['firstName']).toBe('First');
          expect(users[1]['firstName']).toBe('Second');
          expect(users.length).toEqual(2);
          done();
        });
      }); 
  });

  describe("Documents", function() {

      it("createDocument should create a new Document", function(done) {
        docMgr.createDocument('The Hobbit', 'Security', '2010-12-09').then(function(doc){
          expect(doc['title']).toBe('The Hobbit');
          done();
        });
      });

      it("createDocument should create a new Document", function(done) {
        docMgr.createDocument('The Spy', 'Manager', '2010-12-09').then(function(doc){
          expect(doc['title']).toBe('The Spy');
          done();
        });
      });
    
      it("should return all Documents", function(done) {
        docMgr.getAllDocuments(5).then(function(docs){
          expect(docs.length).toEqual(2);
          done();
        });
      });
  });

    describe("Search", function() {

      it("should return all Documents by Role", function(done) {
        docMgr.getAllDocumentsByRole('Security', 5).then(function(docs){
          expect(docs[0]['title']).toBe('The Hobbit');
          expect(docs.length).toEqual(1);
          done();
        });
      });

      it("should return all Documents by Date", function(done) {
        docMgr.getAllDocumentsByDate('2010-12-09', 5).then(function(docs){
          expect(docs[0]['title']).toBe('The Hobbit');
          expect(docs[1]['title']).toBe('The Spy');
          expect(docs.length).toEqual(2);
          done();
        });
        models.role.destroy({where: {}, force: true}).then(function(){
          models.user.destroy({where: {}, force: true}).then(function(){
            models.document.destroy({where: {}, force: true});
          });
        }); 
      });    
  });

});
