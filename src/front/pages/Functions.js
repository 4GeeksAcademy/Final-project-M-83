export const actions = {


    // CODE FOR GET METHOD
      getAllIslanders : (store, setIslanderData, islanderData) =>{
        fetch(store.baseUrl + `islanders`)
        .then((resp) => resp.json())
        .then((data) => {
            setIslanderData(data.islanders)
            console.log("THEN: ", data.islanders)
        }
        )
    },


//  CODE FOR POST METHOD
    newIslander : (name, age, occupation, hometown, bombshell, store, dispatch) => {
        console.log("URL TAG!! :", store.url)
        const options = {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({
                "name": name,
                "age": age,
                "occupation": occupation,
                "hometown": hometown,
                "bombshell": bombshell
            })
        }
        fetch(store.baseUrl + `islanders`, options)
        .then((resp) => resp.json())
        .then((data) => dispatch({ payload: data.islander, type: "set-islanders" }))
    },

// CODE FOR PUT METHOD
       updateIslanderInfo : (name, age, occupation, hometown, bombshell, store, id) => {
            const options = {
                method: "PUT",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({
                    "name": name,
                    "age": age,
                    "occupation": occupation,
                    "hometown": hometown,
                    "bombshell": bombshell,
                })
            }
            fetch(store.baseUrl + `islanders/${id}`, options)
            .then((resp) => resp.json())
        },


// CODE FOR DELETE METHOD
       removeIslander : (store, id) => {
            const options = {
                method: "DELETE",
                headers: {"content-type":"application/json"}
            }
            fetch(store.baseUrl + `islanders/${id}`, options)
            .then()
            .catch((err) => console.error("Error with removing islander: ", err))
        }
    }