export default function Logout(){

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if(!token || !user_id){
        return ({error: "Usuario não está logado."})
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
}