import Validator from "../../utils/validators";
import { User, UserCredentials } from "../../interface/userInterface";
import __User from "../../model/user/userModel";
import getToken from "../../utils/tokenGenerator";

class UserDatasource extends Validator {
  async createUser(data: UserCredentials): Promise<any> {
    let error = await this.userValidation(data);
    if (error) return error;
    const { email } = data;
    const user = await __User.findOne({ email });
    if (user) return "Account already exist";
    await __User.create({
      ...data,
      userName: data.email.split("@")[0],
    });

    // this.sendMail(account.email, 'Welcome To DSPM', templateName.welcome, {
    //   name: account.email.split('@')[0]
    // })
    return "Successfully created an Account";
  }

  async getCurrentUser(User: User):Promise<any> {
    const { _id } = User;
    const user: User = await __User.findById(_id,{password:0});

    if (user) return user;
    return "user not found";
  }
  async loginUser(User: User) {
    await this.userValidation(User);
    const { email } = User;

    const user = await __User.findOne({ email });
    if (!user) {
      return { Error: "invalid credentials" };
    }
    const isPass = await (__User as any).comparePassword(
      user.password,
      User.password
    );
    if (!isPass) {
      return { Error: "invalid credentials" };
    }

    return { accessToken: await getToken(user) };
  }
}

export default UserDatasource;
