module.exports=(sequelize,DataTypes )=>{
  const Post=sequelize.define("Post",{
      title:{
          type:DataTypes.STRING,
          allowNull:false,
      },
      id:{
          type:DataTypes.UUID,
          defaultValue:DataTypes.UUIDV4,
          primaryKey:true,
      },
      postText:{
          type:DataTypes.STRING,
          allowNull:false,
      },
      image:{type:DataTypes.STRING, allowNull:true
     }
      ,
      username:{
          type:DataTypes.STRING,
          allowNull:false,
      },
      isvulnerability:{
          type:DataTypes.BOOLEAN,
          allowNull:true,
          defaultValue:false,
      },
      ismalware:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:false,
    }
      ,
      clickcount:{
          type:DataTypes.INTEGER,
          defaultValue:0
      },
      createdAt:{
          type:DataTypes.DATE,
          defaultValue:DataTypes.NOW,
          autoGenerate:true
      }
      
  });
//   Post.associate=(models)=>{
//     Post.hasMany(models.Comment,{onDelete:"cascade"});
// };

 return Post;

}