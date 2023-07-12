"use client";

import { useSessionContext} from "@supabase/auth-helpers-react";
import Link from "next/link";

const LoginStatus = () => {
  const {
    session, supabaseClient
   } = useSessionContext();

  const logout = async () => {
    await supabaseClient.auth.signOut()
  }

  return !session? (
    <div>
        <Link href={"/sign-up"} className="btn md:btn-md btn-xs btn-ghost">Sign up</Link>
        <Link href={"/login"} className="btn md:btn-md btn-xs btn-primary">Login</Link>
    </div>
  ): 
  <div>
    <button onClick={logout} className="btn btn-secondary">Logout</button>
  </div>
}

export default LoginStatus