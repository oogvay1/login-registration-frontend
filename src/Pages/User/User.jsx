import { useEffect, useState } from "react";

function User() {

    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch('http://localhost:3000/upload', {
            method: "POST",
            body: formData
        });

        const data = await res.json();
console.log(data);
        setUrl(data.url);
    }

    useEffect(() => {
        async function getUser() {
            const token = localStorage.getItem("token");

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

    console.log(document.querySelector('input'));

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
