import {
  GET_DRIVERS,
  GET_BY_NAME,
  GET_BY_ID,
  ORDER,
  GET_TEAMS,
  CLEAR,
  ORIGIN,
  FILTER_TEAM,
  ADD_FAV,
  REMOVE_FAV,
} from "./actions";

const initialState = {
  allDrivers: [],
  allDriversCopy: [],
  allTeams: [],
  driversByName: [],
  driverById: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        allDriversCopy: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        driversByName: action.payload,
        allDriversCopy: action.payload,
      };

    case GET_BY_ID:
      return { ...state, driverById: action.payload };

    case ORDER:
      let driversOrdenados;
      if (action.payload === "A") {
        driversOrdenados = state.allDriversCopy
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "B") {
        driversOrdenados = state.allDriversCopy
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      } else if (action.payload === "A2") {
        driversOrdenados = state.allDriversCopy
          .slice()
          .sort((a, b) => new Date(a.dob) - new Date(b.dob));
      } else if (action.payload === "B2") {
        driversOrdenados = state.allDriversCopy
          .slice()
          .sort((a, b) => new Date(b.dob) - new Date(a.dob));
      } else {
        driversOrdenados = state.allDriversCopy.slice();
      }
      return {
        ...state,
        allDriversCopy: driversOrdenados,
      };

    case ORIGIN:
      if (action.payload === "API") {
        let originSelectedAPI = state.allDrivers.filter(
          (driver) => driver.source === "API"
        );
        return { ...state, allDriversCopy: originSelectedAPI };
      } else if (action.payload === "BDD") {
        let originSelectedBDD = state.allDrivers.filter(
          (driver) => driver.source === "BDD"
        );
        return { ...state, allDriversCopy: originSelectedBDD };
      }

    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };

    case CLEAR:
      return {
        ...state,
        allDriversCopy: state.allDrivers,
      };

    case FILTER_TEAM:
      let matches = state.allDriversCopy.filter((driver) => {
        if (driver.teams) {
          const teamsArray = driver.teams.split(",").map((team) => team.trim());
          return teamsArray.includes(action.payload);
        }
      });
      return {
        ...state,
        allDriversCopy: matches,
      };

    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allDriversCopy: action.payload,
      };

    case REMOVE_FAV:
      return { ...state, myFavorites: action.payload };

    // case ORDER_BY_NAME:
    //   return {
    //     ...state,
    //     alphabeticalOrder: action.payload,
    //   };

    // case ORDER_BY_DOB:
    //   return {
    //     ...state,
    //     dobOrder: action.payload,
    //   };

    default:
      return state;
  }
};

export default rootReducer;
