const getFavoriteIds = async (store) => {
  const token = store.auth?.token || localStorage.getItem("token");
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return []; 
  } 
  try {
    const options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        };
      const resp = await fetch(store.baseUrl + `user/favorites/ids`, options)
      if (resp.ok){
        const data = await resp.json();
        return data.favorite_islander_ids || [];
      } 
  } catch (e) {
    console.error("Error fetching favorites:", e);
  } 
  return [];
}

export const actions = {
  // CODE FOR GET METHOD
  getAllIslanders: async (
    store,
    setIslanderData,
    setFemaleContestants,
    setMaleContestants,
    setBombshells
  ) => {
    try {
      const resp = await fetch(store.baseUrl + `islanders`);
      const data = await resp.json();
      let allIslanders = data.islanders;
      const favoriteIds = await getFavoriteIds(store);
      const augmentedIslanders = allIslanders.map(islander => ({
        ...islander,
        is_favorite: favoriteIds.includes(islander.id)
      }));
      const male = augmentedIslanders.filter((boy) => boy.gender === "Male");
      const female = augmentedIslanders.filter((girl) => girl.gender === "Female");
      const bombs = augmentedIslanders.filter(islander => islander.bombshell === true);
      console.log("FILTER FUNCTION TAG FOR BOY!!!!!!!! :", male);
      console.log("FILTER FUNCTION TAG FOR GIRL!!!!!!!! :", female);
      setIslanderData(augmentedIslanders);
      setMaleContestants(male);
      setFemaleContestants(female);
      setBombshells && setBombshells(bombs);
      return augmentedIslanders;
    } catch (e) {
      console.log("Error Getting Islanders!!!!!!!!!! :", e);
    }
  },

  //  CODE FOR POST METHOD
  newIslander: async (islanderData, store, dispatch) => {
    try {
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: islanderData.name,
          age: islanderData.age,
          occupation: islanderData.occupation,
          hometown: islanderData.hometown,
          gender: islanderData.gender,
          bombshell: islanderData.bombshell,
          photo_url: islanderData.photo_url,
        }),
      };
      const resp = await fetch(store.baseUrl + `islanders`, options);
      const data = await resp.json();
      dispatch({ payload: data.islander, type: "set-islanders" });
    } catch (e) {
      console.log("Error posting new islander!!!!! :", e);
    }
  },

  // CODE FOR PUT METHOD
  updateIslanderInfo: (
    name,
    age,
    occupation,
    hometown,
    bombshell,
    store,
    id
  ) => {
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        age: age,
        occupation: occupation,
        hometown: hometown,
        bombshell: bombshell,
      }),
    };
    fetch(store.baseUrl + `islanders/${id}`, options).then((resp) =>
      resp.json()
    );
  },

  // CODE FOR DELETE METHOD
  removeIslander: (store, id) => {
    const options = {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    };
    fetch(store.baseUrl + `islanders/${id}`, options)
      .then()
      .catch((err) => console.error("Error with removing islander: ", err));
  },

  // 🔒 VOTE: Requires login (uses token)
 voteIslander: async (store, dispatch, islander) => {
  try {
    if (!islander?.id) return false;

    const token = store.auth?.token || localStorage.getItem("token");
    if (!token) { alert("You must log in to vote ❤️"); return false; }

    const nextVotes = (islander.votes || 0) + 1;

    // optimistic
    dispatch({
      type: "update-islander-votes",
      payload: { id: islander.id, votes: nextVotes },
    });

    const resp = await fetch(store.baseUrl + `islanders/${islander.id}/vote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });

    if (!resp.ok) {
      console.error("Vote failed:", await resp.text());
      alert("Vote failed. Please try again.");
      return false;
    }
  },
   // 🔒 FAVORITE: Requires login (uses token)
      toggleFavoriteIslander: async (store, dispatch, islander) => {
        try {
          if (!islander?.id) return false;
          
          const token = store.auth?.token || localStorage.getItem("token");
          if (!token) {
            alert("You must log in to set a favorite contestant ❤️");
            return false;
          }
          const favoriteIslander = islander.is_favorite || false; 
          const method = favoriteIslander ? "DELETE" : "POST";

          const options = {
            method: method, 
            headers: {
              "Content-Type":"application/json",
              Authorization: "Bearer " + token,
            },
          };
          const resp = await fetch (
            store.baseUrl + `user/favorites/${islander.id}`,
            options
          );
          if (resp.status === 401) {
            // Clear the expired token from store and storage
            dispatch({ type: "clear-auth" });
            localStorage.removeItem("token");
            alert("Your session has expired. Please log in again to continue.");
            return false;
          }
          if (!resp.ok) {
            console.error("Favorite toggle failed:", resp.status, await resp.text());
            alert("Failed to favorite islander (Status: ${resp.status}). Please try again");
            return false;
          }
          dispatch({
            type: "toggle-islander-favorite",
            payload: {id: islander.id, is_favorite: !favoriteIslander},
          });
          return true;
        } catch (err) {
          console.error("Error toggling favorite islander:", err)
          return false;
        }
      }
};
