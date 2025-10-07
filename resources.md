# Love Island Interactive Website
Build an interactive "Love Island" website including the following features:
- Home page featuring a Navbar and contestant cards with images of islanders
- User sign up/log in modal
- User profile with a view of the user's favorited islanders
- Voting page featuring a simple counter function
- Leaderboard featuring "coupled up" and "single" contestants with the most votes
- Biography page featuring all islanders

## Data
 The data used for contestants was pulled from the following "Bachelor Nation API":
- Review data here: https://github.com/kthffmn/bachelor-nation-api/blob/master/data/data.json

 * For more details on how to interact with this API, see the [JSON-API Specification](http://jsonapi.org)

From the Bachelor API data.json we will pull the following data for each "islander":
    - "Name",
    - "Gender" of contestant (10 males & 10 females, 5 male and 5 female bombshell islanders),
    - Age (Integer),
    - "Hometown",
    - "Occupation"
    - "Status"  For this project we will modify this object to fit Love Island. Islanders can be "coupled" or "vulnerable".

### 1) Installation:
Calling this function gives you access to the current state and update it by sending an action:
const { store, dispatch } = useGlobalReducer() 

Loads backendUrl from .env files:
const backendUrl = import.meta.env.VITE_BACKEND_URL  


