export const actions = {


    // CODE FOR GET METHOD
      getAllIslanders : (store, setIslanderData) =>{
        fetch(store.baseUrl + `api/islanders`)
        .then((resp) => resp.json())
        .then((data) => {
            setIslanderData(data.islanders)
        }
        )
    },


//  CODE FOR POST METHOD
    newIslander :async (islanderData, store, dispatch) => {
        try{
            const options = {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({
                "name": islanderData.name,
                "age": islanderData.age,
                "occupation": islanderData.occupation,
                "hometown": islanderData.hometown,
                "bombshell": islanderData.bombshell,
                "photo_url": islanderData.photo_url
            })
        }
        const resp = await fetch(store.baseUrl + `api/islanders`, options)
        const data = await resp.json()
        dispatch({ payload: data.islander, type: "set-islanders" })
        }
        catch(e){
            console.log("Error posting new islander!!!!! :", e)
        }
        
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