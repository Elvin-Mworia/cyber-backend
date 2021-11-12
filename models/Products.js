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
            autoGenerate:true, 
        },
        image:{
            type:DataTypes.BLOB,
            allowNull:true
        },
       url:{
           type:DataTypes.STRING,
           allowNull:true
       }
       
    });
   return Products;
  }