import axios from "axios";

export async function LogOut(){
    try{
       await axios.get('/api/users/logOut')
    }catch(error : any){
        console.log(error.message);
        
    }
}