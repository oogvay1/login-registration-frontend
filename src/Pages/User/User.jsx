import { useEffect, useState } from "react";

function User() {

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getUser() {

            if (!token) return null;

            try {
                const res = await fetch(`http://localhost:3000/users`, {
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

    // useEffect(() => {

    //     async function getPosts() {

    //         try {

    //             const res = await fetch('http://localhost:3000/')
    //         } catch (err) {

    //         }
    //     }

    //     getPosts();
    // }, []);

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

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>

            <input type="text" />

            {url && (
                <div>
                    {file?.type.startsWith("image/") ? (
                        <img src={url} alt="uploaded" width="200" />
                    ) : (
                        <video controls width="300">
                            <source src={url} type={file.type} />
                        </video>
                    )}
                </div>
            )}
        </div>
    );

}

export default User
