import __User from "../model/user/userModel"
import { User } from "../interface/userInterface";

export const newKey = async (): Promise<string> => {
  var key           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 64; i++ ) {
    key += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return key;
}

export const deCodeKey = async({_id}:User,key:string):Promise<boolean>=>{
   let user:User = await __User.findById(_id)
   if(!user){
     return false
   }

   let token:string = user.apiKey
   
  return (token === key)
}


