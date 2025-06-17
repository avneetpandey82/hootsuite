import { useRouter } from "next/router";
import { useEffect } from "react";

function landingPage(){
    const router = useRouter();
    useEffect(()=>{
        router.push('/dashboard')
    },[])
    return ''
}

export default landingPage