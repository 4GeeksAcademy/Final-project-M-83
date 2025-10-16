
  


export const loginUser = (store, dispatch, credentials) => {
    fetch(store.baseUrl + "log_in", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(credentials)
    })
    .then(resp => resp.json())
    .then(data => {
        console.log("Login data:", data);
        if (data.token) {
            localStorage.setItem("token", data.token);
            dispatch({
                type: "setAuth",
                payload: {
                    isAuthenticated: true,
                    token: data.token,
                    user: data.user
                }
            });
        } else {
            alert("Invalid credentials");
        }
    })
    .catch(err => console.error("Login error:", err));
};



export const getAllUsers = (store, dispatch) => {
    fetch(store.baseUrl + "user")
        .then(resp => resp.json())
        .then(data => {
            console.log("Fetched users:", data);
            dispatch({
                type: "setUsers",
                payload: data.data
            });
        })
        .catch(err => console.error("Error fetching users:", err));
};


export const signUp = (store , dispatch , userData) => {
    fetch(store.baseUrl + "user",{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify (userData)
    })
    .then((resp)=> resp.json())
    .then((data)=>{
        console.log("User Created:", data);
        dispatch({
        type: "addUser",
        payload:data.user || data
    });
})
    .catch(err => console.error("Error creating user :",err));
};

export const updateUser = (store, dispatch, userId, updatedData) => {
    fetch(`${store.baseUrl}user/${userId}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token") // if protected
        },
        body: JSON.stringify(updatedData)
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.user) {
            console.log("User updated:", data.user);
            dispatch({
                type: "updateUser",
                payload: data.user
            });
        } else {
            console.error("Update failed:", data.msg);
        }
    })
    .catch(err => console.error("Error updating user:", err));
};

export const deleteUser = (store, dispatch, userId) => {
    fetch(`${store.baseUrl}user/${userId}`, { method: "DELETE" })
        .then(resp => {
            if (resp.ok) {
                console.log(`User ${userId} deleted`);
                dispatch({
                    type: "deleteUser",
                    payload: userId
                });
            } else {
                console.error("Delete failed");
            }
        })
        .catch(err => console.error("Error deleting user:", err));
};


export const logoutUser = (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: "logout"
    });
};