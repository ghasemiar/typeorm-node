import {User} from "../Entities/User";
import bcrypt from "bcrypt";
import {generateToken} from "../Helper/GnrateToken";
import {UserLoginDto, UserRegisterDTO} from "../Validations/UserValidation";
import {myDataSource} from "../Database/Connection";
export const loginUserService = async (data: UserLoginDto): Promise<{ data?:any,code:number,msg:string,token?:string }> => {
    const {username,password} = data
    //check username exist

    // const user: IUser | null = await User.findOne({username} );
    const user = await myDataSource.getRepository(User).findOneByOrFail({
        username:username,
        password:password
    })
    if (!user) {
        return {msg:"user not found", code:404};
    }
    //compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return {msg:"invalid password", code:401};
    }
    //generate token
    const token = generateToken(user);

    return {msg:"welcome back",code:200,token:token,data:data}
}

export const registerUserService = async (data: UserRegisterDTO): Promise<{ data:any,code:number,msg:string,token?:string }> => {
    //check user exist
    console.log(data)
    const {username,email} = data
    const existingUser: User | null = await myDataSource.getRepository(User).findOneBy(  {username} );
    if (existingUser){
        return {msg:"user already exist",code:304,data:data}
    }
    //check email
    const checkEmail: User | null = await myDataSource.getRepository(User).findOneBy({email});
    if (checkEmail){
        return {msg:"this email already used" ,code:333,data:data}
    }
    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    //save user
    const user = await myDataSource.createQueryBuilder()
        .insert()
        .into(User)
        .values(data)
        .execute()
    const token = generateToken(data);
    return {data:data,msg:"welcome",code:201,token:token}
}

