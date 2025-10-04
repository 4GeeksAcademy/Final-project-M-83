const { store, dispatch } = useGlobalReducer()
const backendUrl = import.meta.env.VITE_BACKEND_URL  thiis is how you use .env variables

From the Bachelor API data.json we will pull the following data for each islander:
    Name,
    Male/Female contestant,
    Age,
    Hometown,
    Occupation,
    Status: (week of elimination, runner up, or winner)
