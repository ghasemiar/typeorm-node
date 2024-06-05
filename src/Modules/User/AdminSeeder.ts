import * as bcrypt from 'bcrypt';
import {myDataSource} from "../../Database/Connection";
import {User, UserRole} from "./Entity";

export const createAdmin = async () => {
    const userTable = myDataSource.getRepository(User)

    // Check if the admin user exists
    const admin = await userTable.findOneBy({username:"superadmin"});
    if (!admin) {
        try {
            const adminUser = new User();
            adminUser.name = "superadmin";
            adminUser.username = 'superadmin';
            adminUser.password = await bcrypt.hash('superadmin', 10); // Replace 'adminPassword' with a strong password
            adminUser.role = UserRole.ADMIN;
            await userTable.save(adminUser);
            console.log("admin created successfully");
        }catch (err){
            console.log(err);
        }
    }else console.log("admin already exist")
};