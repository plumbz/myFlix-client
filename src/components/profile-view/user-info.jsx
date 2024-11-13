import React from "react";

export const UserInfo = ({ email, name }) => {
    return (
        <>
            <h3>User Profile</h3>
            <p>User: {name}</p>
            <p>Email: {email}</p>
        </>
    )
}