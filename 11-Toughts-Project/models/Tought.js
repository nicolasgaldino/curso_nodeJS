import User from "./User.js";
import db from "../db/conn.js";
import { DataTypes } from "sequelize";


const Tought = db.define("Tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

export default Tought;
