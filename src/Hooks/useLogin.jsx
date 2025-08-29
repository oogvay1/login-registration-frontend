import { useNavigate } from "react-router-dom";

export function useLogin() {

    const navigate = useNavigate();

    const signup = async (data) => {

        const res = await fetch('http://localhost:3000/users/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error;

        const json = await res.json();

        return json;
    }


    const login = async (data) => {


        try {

            const res = await fetch('http://localhost:3000/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();
            navigate('/');

            localStorage.setItem('token', json.token);
            console.log(json);
            return json;
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {

        try {

            const res = await fetch('http://localhost:3000/users/logout');
            const data = await res.json();

            localStorage.removeItem('token');
            navigate('/auth')
        } catch (err) {
            console.error(err);
        }
    }

    return { login, signup, logout };
}