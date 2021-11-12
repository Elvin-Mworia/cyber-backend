module.exports=(sequelize,DataTypes )=>{
    const Users=sequelize.define("Users",{
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        
        },
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        }, 
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        }

    });
   return Users;
  }