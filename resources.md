This project replicates the excitement of a Love Island–style competition with a modern tech stack and full CRUD(Create, Read, Update, Delete) capability. It allows users to engage interactively with contestants, track popularity, and personalize their experience.
  
Review data here: https://github.com/kthffmn/bachelor-nation-api/blob/master/data/data.json
From the Bachelor API data.json we will pull the following data for each "islander":
    "Name",
    "Gender" of contestant (10 males & 10 females, 5 male and 5 female bombshell islanders),
    Age (Integer),
    "Hometown",
    "Occupation"


//calling this function gives you access to the current state and update it by sending an action
const { store, dispatch } = useGlobalReducer() 

//loads backendUrl from .env files
const backendUrl = import.meta.env.VITE_BACKEND_URL  


## 🧩 Filtering Rules

| Purpose | Filter Logic | Example Code |
|----------|---------------|--------------|

| **Initial Contestant Selection** | Show 10 male and 10 female contestants (`is_bombshell === false`). | ```js\ncontestants.filter(c => c.gender === "female" && !c.is_bombshell)\n``` |

| **Bombshell Contestants** | Show 5 male and 5 female contestants added later (`is_bombshell === true`). | ```js\ncontestants.filter(c => c.is_bombshell)\n``` |

| **Leaderboard Display** | Sort contestants by total votes (descending). | ```js\ncontestants.sort((a, b) => b.votes - a.votes)\n``` |

| **Voting Page Display** | Filter out contestants who have already been voted for by the current user. | ```js\ncontestants.filter(c => !user.votedFor.includes(c.id))\n``` |

| **User Favorites (Optional)** | Show only contestants marked as favorites by the logged-in user. | ```js\nuser.favorite_islanders\n``` |


## 🌐 API Filtering Endpoints (Backend Logic)

Filtering can also be handled server-side for efficiency. Below are potential API endpoints and how they might be structured:

| Endpoint | Description | Example Response |
|-----------|--------------|------------------|
| "GET /api/islanders" | Returns all islanders (default endpoint). | `[ { id: 1, name: "Alex", gender: "male", ... } ]` |

| "GET /api/islanders?gender=female" | Filters islanders by gender. | Returns only female islanders. |

| "GET /api/islanders?is_bombshell=true" | Filters islanders who are bombshells. | Returns all bombshell islanders. |

| "GET /api/islanders?sort=votes" | Sorts islanders by votes (highest to lowest). | Returns leaderboard-ready data. |

| "GET /api/islanders/:id" | Returns details for a single contestant by ID. | `{ id: 5, name: "Sofia", hometown: "Miami, FL", ... }` |

### Example Backend Logic (Flask)
```python
@app.route("/api/islanders", methods=["GET"])
def get_islanders():
    gender = request.args.get("gender")
    is_bombshell = request.args.get("is_bombshell")
    sort = request.args.get("sort")

    filtered = data["islanders"]

    if gender:
        filtered = [c for c in filtered if c["gender"] == gender]

    if is_bombshell:
        filtered = [c for c in filtered if str(c["is_bombshell"]).lower() == is_bombshell.lower()]

    if sort == "votes":
        filtered = sorted(filtered, key=lambda x: x["votes"], reverse=True)

    return jsonify(filtered)
