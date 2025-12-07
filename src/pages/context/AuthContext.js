import { createContext, useState, useEffect, useContext } from "react";
import supabase from "../../config/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Sign in user
    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.log(error);
            return { success: false, error: error.message };
        }

        if (data.session) {
            setSession(data.session);
            return { success: true, data };
        }

        return { success: false, error: "Unknown error" };
    };

    // Sign out user
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        }
        setSession(null);
    };

    // Get session on mount & subscribe to session changes
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => useContext(AuthContext);
