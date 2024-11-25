import React from "react";

export const UserInfo = ({ email, name }) => {
    return (
        <>
            <h3 style={{ color: "white" }}>User Profile</h3>
            <p style={{ color: "white" }}>Name: {name}</p>
            <p style={{ color: "white" }}>Email: {email}</p>
        </>
    )
}