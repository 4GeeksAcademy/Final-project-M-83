export const getAllIslanders = (store, setIslanderData, islanderData) =>{
    let islanders = ""
        fetch(store.baseUrl + `islanders`)
        .then((resp) => resp.json())
        .then((data) => {
            setIslanderData(data.islanders)
            console.log("THEN: ", data.islanders)
        }
        )
        console.log("Islanders!!!: ", islanderData)
        return islanders
    };