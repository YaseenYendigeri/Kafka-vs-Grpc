import { Model, DataTypes } from "sequelize";
import { sequelize } from "src/models/index";
import { SequelizeHooks } from "sequelize/types/hooks";

class USER extends Model {
  public static associate(models: any): void {
    // Define associations here
  }
}

USER.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    mobile: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "USER",
  }
);

export default USER;
