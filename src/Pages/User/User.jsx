import { useEffect, useState } from "react";
import { useLogin } from "../../Hooks/useLogin";

function User() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const token = localStorage.getItem("token");

    const { logout } = useLogin();

    useEffect(() => {
        async function getUser() {

            if (!token) return null;

            try {
                const res = await fetch(`http://localhost:3000/users/`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                setUser(data);
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        }

        getUser();
    }, []);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", user && user._id);
        formData.append("description", "My first post");

        const res = await fetch('http://localhost:3000/upload', {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            body: formData
        });

        const data = await res.json();
        console.log(data);
        setUrl(data.url);
    }

    useEffect(() => {

        async function getPosts() {

            try {

                const res = await fetch('http://localhost:3000/upload/posts', {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${token}`
                    },
                    body: user && user._id,
                });

                const data = await res.json();

                setPosts(data);
            } catch (err) {

            }
        }

        getPosts();
    }, [url]);

    return (
        <div>
            {user ? (
                <>
                    <p>ID: {user._id}</p>
                    <p>Full Name: {user.fullName}</p>
                    <p>Email: {user.email}</p>
                    <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
                    <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
                </>
            ) : (
                <p>Loading user...</p>
            )}

            <button onClick={logout}>Logout</button>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>

            <input type="text" />

            {posts && posts.map((el, index) => (
                <div key={index}>
                    {el.type == 'image' ? (
                        <img src={el.mediaUrl} alt="uploaded" />
                    ) : (
                        <video muted autoPlay loop>
                            <source src={el.mediaUrl} type='video/mp4' />
                        </video>
                    )}
                    <p>{el.description}</p>
                </div>
            ))}
        </div>
    );

}

export default User
