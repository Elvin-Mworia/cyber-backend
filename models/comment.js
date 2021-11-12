module.exports=(sequelize,DataTypes )=>{
    const comment=sequelize.define("Comment",{
       
        comment:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
type:DataTypes.STRING,
allowNull:false
        },
        postid:{
            type:DataTypes.STRING,
            allowNull:false
        }
        ,
      id:  {
          type:DataTypes.UUID,
          primaryKey:true,
          autoGenerate:true

        }

    });
   return comment;
  }