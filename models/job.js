'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get formattedCreatedDate() {
      return this.createdAt.toISOString().split('T')[0]
    }

    static associate(models) {
      Job.belongsTo(models.Company, {
        foreignKey: "CompanyId"
      })
      Job.belongsTo(models.User, {
        foreignKey: "UserId"
      })
      Job.hasMany(models.Log, {
        foreignKey: "JobId"
      })
      Job.hasMany(models.Bookmark, {
        foreignKey: "JobId"
      })
    }
  };
  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty"
        },
        notNull: {
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description cannot be empty"
        },
        notNull: {
          msg: "Description is required"
        }
      }
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Company cannot be empty"
        },
        notNull: {
          msg: "Company Type is required"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Job Type cannot be empty"
        },
        notNull: {
          msg: "Job Type is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  Job.beforeCreate((job) => {
    job.status = 'Active'
  })
  return Job;
};