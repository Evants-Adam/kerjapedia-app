'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash-helper')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Job, {
        foreignKey: "UserId"
      })
      User.hasMany(models.Log, {
        foreignKey: "UserId"
      })
      User.hasMany(models.Bookmark, {
        foreignKey: "UserId"
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username cannot be empty"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Email format is not valid"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        },
        isValidLength (value) {
          if (value.length < 5) {
            throw ("Password length minimum 5")
          }
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone Number is required"
        },
        notEmpty: {
          msg: "Phone Number cannot be empty"
        },
        len: {
          args: [6, 50],
          msg: "Phone Number is Invalid, must between 6 - 50 characters"
        }
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address is required"
        },
        notEmpty: {
          msg: "Address cannot be empty"
        },
        isValidLength (value) {
          if (value.length < 3) {
            throw ("Address length minimum 3")
          }
        }
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)

    if (!user.role) {
      user.role = "Admin"
    }
  })
  return User;
};