export const initialStore = () => {
  return {
    baseUrl: ask Alex,
    islanders: [],      
    favorites: [],       
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set-islanders":
      return {
        ...store,
        islanders: action.payload,
      };


    case "add-favorite":
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };

    case "remove-favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          (fav) => fav.id !== action.payload.id
        ),
      };

    default:
      throw Error("❌ Unknown action type: " + action.type);
  }
}}
