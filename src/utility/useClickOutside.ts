import { useEffect } from "react";

export default function useClickOutside(ref: React.RefObject<HTMLElement | null>,setState:(state:boolean)=>void){
    useEffect(()=>{
        console.log("TEst")
        const eventListener = (e:globalThis.MouseEvent)=>{
            if (ref.current && !ref.current.contains(e.target as Node)){
                setState(false)
            }
        }
         document.documentElement.addEventListener("mousedown",eventListener)
        return ()=> document.documentElement.removeEventListener("mousedown",eventListener)
    },[ref,setState])
}