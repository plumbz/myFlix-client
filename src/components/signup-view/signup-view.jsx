import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
            firstName: firstName,
            lastName: lastName
        };
        console.log(data);
        fetch("https://movie-flix19-efb939257bd3.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Firstname:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required
                    minLength="3"
                />
            </label>
            <label>
                Lastname:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required
                    minLength="3"
                />
            </label>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Birthday:
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};