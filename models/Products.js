module.exports=(sequelize,DataTypes )=>{
    const Products=sequelize.define("Products",{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        id:{
            type:DataTypes.UUID,
            primaryKey:true,
           defaultValue:DataTypes.UUIDV4

        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false,
            
        },
        image:{
            type:DataTypes.STRING,
            allowNull:true
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false

        },
       url:{
           type:DataTypes.STRING,
           allowNull:true
       },
       cartstate:{
           type:DataTypes.BOOLEAN,
           defaultValue:false,
           autoGenerate:true
       }
       
    });
   return Products;
  }