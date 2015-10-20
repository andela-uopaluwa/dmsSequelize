"use strict";

module.exports = function(sequelize, DataTypes) {
	var Role = sequelize.define('role', {
		title: {
			type: DataTypes.STRING,
			primaryKey: true
		}
	},{
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.user)
      	}
    	}
  	}
	);


	var User = sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
			lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	},{
		
	    classMethods: {
	      associate: function(models) {
	        User.belongsTo(models.role
	        );
	      }
	    }
		}
	); 


	var Document = sequelize.define('document', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		publishedDate: {
			type: DataTypes.DATEONLY,
			defaultValue: DataTypes.NOW 
		}
	},{
		
	    classMethods: {
	      associate: function(models) {
	        Document.belongsTo(models.role, {
	          foreignKey: 'accessRole'
	        	}
	        );
	      }
	    }
		}
	);
	// sequelize.sync({force: true});

  return [User, Role, Document];
};


// User.belongsTo(Role, {foreignKey: 'userRole'});
// Document.belongsTo(Role, {foreignKey: 'accessRole'});


