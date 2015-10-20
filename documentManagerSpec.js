describe("Document Management System", function() {
  var docMgr = require("./documentManager");

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
          expect(roles.length).toEqual(2);
          done();
        });
      });
  });

  describe("Users", function() {

      it("createUser should create new Users", function(done) {
        docMgr.createUser('Blaq', 'Daddy', 'Security').then(function(user){
          expect(user.firstName).toBe('Blaq');
          done();
        });
      });
    
      it("getAllUsers should return all Users", function(done) {
        docMgr.getAllUsers().then(function(users){
          expect(users.length).toEqual(1);
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
          console.log('all docs', docs);
          expect(docs.length).toEqual(2);
          done();
        });
      });

      it("should return all Documents by Role", function(done) {
        docMgr.getAllDocumentsByRole('Security', 5).then(function(docs){
          console.log('by role', docs);
          expect(docs.length).toEqual(1);
          done();
        });
      });

      it("should return all Documents by Date", function(done) {
        docMgr.getAllDocumentsByDate('2010-12-09', 5).then(function(docs){
          console.log('by date', docs);
          expect(docs.length).toEqual(2);
          done();
        });
      });
  });

});
