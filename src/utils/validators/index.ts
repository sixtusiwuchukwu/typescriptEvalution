import { UserCredentials } from "../../interface/userInterface";
import {
  userValidator,
  UpdateUserValidator,
  UserResetPasswordValidator,
  UserForgotPasswordValidator,
UserUpdatePasswordValidator,
} from "./userSchema.ts";

class Validator {
  //____user validation starts________//
  async userValidation(data: UserCredentials):Promise<object> {
    try {
       await userValidator.validate(data);
    } catch (e) {
      return {errorType:"InputValidationError", message:e.message}
    }
  }
  async UpdateUserValidation(data: {phone:string,fullName:string}):Promise<object> {
    try {
       await UpdateUserValidator.validate(data);
    } catch (e) {
      return {errorType:"InputValidationError", message:e.message}
    }
  }
  async UserResetPasswordValidation(data: {token:string,password:string}):Promise<object>  {
    try {
       await UserResetPasswordValidator.validate(data);
    } catch (e) {
      return {errorType:"InputValidationError", message:e.message}
    }
  }
  async UserForgotPasswordValidation(data: {email:string}):Promise<object>  {
    try {
      await UserForgotPasswordValidator.validate(data);
    } catch (e) {
      return {errorType:"InputValidationError", message:e.message}
    }
  }
  async UserUpdatePasswordValidator(data: {oldPassword:string,newPassword:string}):Promise<object>  {
    try {
      await UserUpdatePasswordValidator.validate(data);
    } catch (e) {
      return {errorType:"InputValidationError", message:e.message}
    }
  }//____user validation end________//
}

export default Validator;
