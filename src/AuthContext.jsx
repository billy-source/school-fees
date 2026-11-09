import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setProfile(null); return; }
    setLoading(true);
    supabase.from("profiles").select("*").eq("id", session.user.id).single()
      .then(({ data }) => { setProfile(data); setLoading(false); });
  }, [session?.user?.id]); // eslint-disable-line

  const logout = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ session, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}