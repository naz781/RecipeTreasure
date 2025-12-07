import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../pages/context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { session, signIn } = UserAuth();
    const navigate = useNavigate();

    // ✅ Redirect logged-in users automatically
    useEffect(() => {
        if (session) {
            navigate('/create');
        }
    }, [session, navigate]);

    const handleSignIN = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn(email, password);
            if (!result.success) {
                setError(result.error || 'Login failed');
                setLoading(false);
                return;
            }
            navigate('/create');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // ✅ Always reset loading
        }
    };

    return (
        <div className="page create">
            <form onSubmit={handleSignIN}>
                <h2 className="font-bold pb-2">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="error">{error}</p>}
                <p>Only authorized users can login.</p>
            </form>
        </div>
    );
};

export default Login;
