export const isLogin = ()=>{
    let user = localStorage.getItem("cozastore","123")
    if (user) {
        return true;
    } else {
        return false;
    }
}