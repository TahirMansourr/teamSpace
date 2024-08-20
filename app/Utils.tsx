import axios from "axios";

export async function LogOut(){
    try{
       await axios.get('/api/users/signOut')
    }catch(error : any){
        console.log(error.message);
        
    }
}

export async function GetUserInfo() {
    console.log('reacher here');
    
    try {
     const user = await axios.get('/api/users/userInfo') // here if you remove the '/' at the begginnig of the route axios will return html
     console.log("🚀 ~ getUserInfo ~ user:", user)
    return user.data
    } catch (errors : any) {
     throw new Error(`error at getUser Infor : ${errors}`);
     
    }
   }