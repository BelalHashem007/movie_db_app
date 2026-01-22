import { supabase } from "./setup";

async function createAccount(email:string,password:string) {
    try {
        const {data,error} = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                display_name:email.split("@")[0]
            }
        }
    })
    return {data,error};
    } catch (error) {
        console.error(error)
        return {data:null,error};
    }
    
}

function signInListener(callback: (userid:string | undefined)=>void){
    const {data}=supabase.auth.onAuthStateChange((event,session)=>{
        if (event === "SIGNED_IN")
            callback(session?.user.id);
    })
    return data.subscription.unsubscribe;
}

export {createAccount,signInListener};