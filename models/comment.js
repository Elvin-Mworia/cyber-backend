module.exports=(sequelize,DataTypes )=>{
    const Comment=sequelize.define("Comment",{
       
        comment:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
type:DataTypes.STRING,
allowNull:false
        },
      id:  {
          type:DataTypes.UUID,
          primaryKey:true,
          defaultValue:DataTypes.UUIDV4

        },
        PostId:{
            type:DataTypes.STRING,
            allowNull:false

        }

    });
   return Comment;
  }