

export const actions = {


    // CODE FOR GET METHOD
    getAllIslanders :async (store, setIslanderData, setFemaleContestants, setMaleContestants) =>{
        try{
            const resp = await fetch(store.baseUrl + `islanders`)
            const data = await resp.json()
            const male = data.islanders.filter(
                (boy) => boy.gender === "Male"
            )
            const female = data.islanders.filter(
                (girl) => girl.gender === "Female"
            )
            console.log("FILTER FUNCTION TAG FOR BOY!!!!!!!! :", male)
            console.log("FILTER FUNCTION TAG FOR GIRL!!!!!!!! :", female)
            setIslanderData(data.islanders)
            setMaleContestants(male)
            setFemaleContestants(female)
            return data.islanders
        }
        catch(e){
            console.log("Error Getting Islanders!!!!!!!!!! :", e)
        }

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
                "gender": islanderData.gender,
                "bombshell": islanderData.bombshell,
                "photo_url": islanderData.photo_url
            })
        }
        const resp = await fetch(store.baseUrl + `islanders`, options)
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
        },
    
// 🔒 VOTE: Requires login (uses token)
voteIslander: async (store, dispatch, islander) => {
  try {
    if (!islander?.id) return;

    const token = store.auth?.token || localStorage.getItem("token");
    if (!token) {
      alert("You must log in to vote ❤️");
      return false;
    }

    const nextVotes = (islander.votes || 0) + 1;
    dispatch({
      type: "update-islander-votes",
      payload: { id: islander.id, votes: nextVotes },
    });
    
   
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    // 👇 UPDATED PATH — now /api/islanders/<id>/vote
    const resp = await fetch(store.baseUrl + `islanders/${islander.id}/vote`, options);

    if (!resp.ok) {
      console.error("Vote failed:", await resp.text());
      alert("Vote failed. Please try again.");
      return false;
    }

    const data = await resp.json();
    const updatedVotes = data?.data?.votes ?? nextVotes;
    dispatch({
      type: "update-islander-votes",
      payload: { id: islander.id, votes: updatedVotes },
    });
    return true;

  } catch (err) {
    console.error("Error voting islander:", err);
    return false;
  }
 } 
}