import {Table,Column,Model,DataType, PrimaryKey} from "sequelize-typescript"

@Table({
    tableName:"users", //db ma hune tablename
    modelName:"User", //project ma query garda use garney
    timestamps:true
})

class User extends Model{  //model class bata inherit so we can use Model to create columns 
   @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,

   })
   declare id:string
   
   
    @Column({  //@huda decorator @nahuda function set tsconfig 18-19 commentout
        type:DataType.STRING
    })
    declare username:string

    @Column({
        type:DataType.STRING
    })
    declare password:string
    @Column({
        type:DataType.STRING,
        unique: {
            name: "unique_email",
            msg: "Email already exists"
        }
    })
    declare email:string
    @Column({
        type:DataType.ENUM('teacher','institute','super-admin','student'),
        defaultValue:'student'
    })
    declare role:string
    @Column({
        type:DataType.STRING
    })
    declare currentInstituteNumber : string
}

export default User