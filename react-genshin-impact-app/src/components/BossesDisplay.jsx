import { useReducer } from "react";
import BossCard from "./BossCard";

export default function BossesDisplay({ bosses }) {
  // reducer used to fulfill carousel-like functionality, keeping tab of which boss is being displayed
  function reducer(state, action) {
    // cannot exceed number of bosses or go below 0
    switch (action.type) {
      case "increment": {
        if (state.count + 1 >= bosses.length) {
          console.log(state.count);
          return state;
        } else {
          return { count: state.count + 1 };
        }
      }
      case "decrement": {
        if (state.count - 1 < 0) {
          console.log(state.count);
          return state;
        } else {
          return { count: state.count - 1 };
        }
      }
      default: {
        return state;
      }
    }
  }

  // what reducer will be changing
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  // simple functionality of reducer
  function increment() {
    dispatch({ type: "increment" });
  }

  function decrement() {
    dispatch({ type: "decrement" });
  }

  const url = "https://genshin.jmp.blue/boss/weekly-boss";

  return (
    <div
      style={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      {bosses && bosses.length > 0 ? (
        <>
          <BossCard
            url={url + "/" + bosses[state.count]}
            name={bosses[state.count]}
          />
          <br />
          <div className="bossButtonsContainer">
            {state.count > 0 ? (
              <button onClick={decrement}>Previous Boss</button>
            ) : (
              <button disabled onClick={decrement}>
                Previous Boss
              </button>
            )}{" "}
            {state.count < bosses.length - 1 ? (
              <button onClick={increment}>Next Boss</button>
            ) : (
              <button disabled onClick={increment}>
                Next Boss
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No bosses seem to be available for display...</p>
      )}
    </div>
  );
}
