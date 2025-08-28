import { useState } from "react";
import { useEffect } from "react";
import { useLogin } from "../../Hooks/useLogin";

function Login() {

    const {login, signup} = useLogin();

    const initialFormS = {
        fullName: "",
        email: "",
        password: ""
    }

    const initialFormL = {
        email: "",
        password: ""
    }

    const [isLogin, setIsLogin] = useState(false);
    const [form, setForm] = useState(initialFormS);

    const handleForm = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const result = await isLogin ? login(form) : signup(form);

        } catch (err) {
            console.error(err);
        } finally {
            setForm(isLogin ? initialFormL : initialFormS);
        }
    }

    return (
        <>
            <section>
                <div className="container">

                    <div className="login-inner">
                        <div className="title">
                            <h1>{isLogin ? 'Login' : 'Sign Up'} to continue</h1>
                        </div>

                        <div className="login-main">

                            <form className="inputs">
                                {isLogin ? null : (<div className="input-container">
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        type="text"
                                        placeholder="Full name"
                                        autoComplete="off"
                                        required
                                        value={form.fullName}
                                        name="fullName"
                                        onChange={handleForm}
                                    />
                                </div>)}

                                <div className="input-container">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        autoComplete="off"
                                        required
                                        value={form.email}
                                        name="email"
                                        onChange={handleForm}
                                    />
                                </div>

                                <div className="input-container">
                                    <i className="fa-solid fa-unlock-keyhole"></i>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                        required
                                        value={form.password}
                                        name="password"
                                        onChange={handleForm}
                                    />
                                </div>
                            </form>

                            <button onClick={handleSubmit} type="submit">{(isLogin && 'Login') || 'Sign Up'}</button>
                        </div>

                        <p>
                            {isLogin ? 'Dont have an account' : 'Already have an account'}
                            <button
                                onClick={() => {
                                    setIsLogin(prev => {
                                        const newState = !prev;
                                        setForm(newState ? initialFormL : initialFormS); // 👈 use newState
                                        return newState;
                                    });
                                }}
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>

                </div>
            </section>
        </>
    );
}

export default Login
