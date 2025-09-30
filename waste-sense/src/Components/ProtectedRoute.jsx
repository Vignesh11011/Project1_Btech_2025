import React, { useEffect, useState } from "react";
import { supabase } from "../supabase_client.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) setAuthenticated(true);
      setLoading(false);
    };
    checkSession();

    // Optional: subscribe to auth state changes
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!authenticated) return <Navigate to="/auth" replace />;

  return children;
}
