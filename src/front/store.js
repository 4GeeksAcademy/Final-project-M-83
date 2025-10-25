export const initialStore = () => {
  return {
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    islanderInfo: {
      "name": "",
      "age": "",
      "occupation": "",
      "hometown": "",
      "bombshell": ""
    },
    islanders: [],
    users: [],
    auth: {
      isAuthenticated: false,
      token: null,
      user: null
    },      
    favorites: [] 
          
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set-users":
      return {
        ...store,
        users: action.payload,
      };

    case "addUser":
      return {
        ...store,
        users: [...store.users, action.payload]
      };
    
    case "updateUser":
      return{
        ...store,
        users: store.user.map(u => u.id === action.payload.id ? action.payload : u)
      };

    case "deleteUser":
      return {
        ...store,
        users: store.users.filter (u => u.id !== action.payload)
      };  

    case "setAuth":
      return{
        ...store,
        auth:action.payload
      };
    case "logout":
      return{
        ...store,
        auth: {
          isAuthenticated: false,
          token: null,
          user: null
        }
      };  

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
}
