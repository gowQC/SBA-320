import { useReducer } from "react";
import BossCard from "./BossCard";

export default function BossesDisplay({ bosses }) {
  function reducer(state, action) {
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

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function increment() {
    dispatch({ type: "increment" });
  }

  function decrement() {
    dispatch({ type: "decrement" });
  }

  const url = "https://genshin.jmp.blue/boss/weekly-boss";

  const bossNameConversions = {
    "all-devouring-narwhal": "All-Devouring Narwhal",
    azhdaha: "Azhdaha",
    childe: "Childe",
    "everlasting-lord-of-arcane-wisdom": "Everlasting Lord of Arcane Wisdom",
    "guardian-of-apep-s-oasis": "Guardian of Apep's Oasis",
    "la-signora": "La Signora",
    "lupus-boreas": "Lupus Boreas",
    "magatsu-mitake-narukami-no-mikoto": "Magatsu Mitake Narukami no Mikoto",
    stormterror: "Stormterror",
    "the-knave": "The Knave",
  };

  return (
    <div>
      {bosses && bosses.length > 0 ? (
        <>
          <div className="bossesDisplay">
            <BossCard
              url={url + "/" + bosses[state.count]}
              name={bosses[state.count]}
              printName={bossNameConversions[bosses[state.count]]}
            />
          </div>
          <br />
          {state.count > 0 ? (
            <button onClick={decrement}>Previous Boss</button>
          ) : (
            <></>
          )}{" "}
          {state.count < bosses.length - 1 ? (
            <button onClick={increment}>Next Boss</button>
          ) : (
            <></>
          )}
        </>
      ) : (
        <p>No bosses seem to be available for display...</p>
      )}
    </div>
  );
}

// {bosses.map((boss, index) => {
//   return (
//     <BossCard
//       url={url + "/" + boss}
//       name={boss}
//       printName={bossNameConversions[boss]}
//     />
//   );
// })}
