module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("tasks", {
    task_name: {
      type: DataTypes.STRING,
      required: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    task_time: {
      type: DataTypes.STRING,
      required: true,
    },
  });
  return Tasks;
};
