import { useState, useEffect } from "react";
import Teammate from "./Teammate";

export default function TeamTable() {
  const characters_url = "https://genshin.jmp.blue/characters";
  const weapons_url = "https://genshin.jmp.blue/weapons";
  const artifacts_url = "https://genshin.jmp.blue/artifacts";

  // useState values using localStorage - on first load, setting value to a localStorage item that does not yet exist simply sets it to a value of null
  const [inactiveTeamMembers, setInactiveTeamMembers] = useState(
    localStorage.getItem("characters")
  ); // will store active and inactive (not selected) team members + their weapon value
  const [weapons, setWeapons] = useState(localStorage.getItem("weapons")); //will store all available weapon names
  const [artifacts, setArtifacts] = useState(localStorage.getItem("artifacts")); // will store all available artifact sets

  // test logs...
  // console.log(inactiveTeamMembers);
  // console.log(weapons);
  // console.log(artifacts);

  // useState values for the form
  const [teamSlot, setTeamSlot] = useState("");
  const [chosenMember, setChosenMember] = useState("");

  // populate function - populates data based on string arg passed through
  const populate = async (url, string) => {
    try {
      const firstResponse = await fetch(url);
      const firstData = await firstResponse.json();
      const finalData = []; // will be array of objects regardless of if statement
      // for characters populating
      if (string === "characters") {
        for (let i = 0; i < firstData.length; i++) {
          const newUrl = url + "/" + firstData[i];
          // console.log(newUrl);
          const secondResponse = await fetch(newUrl);
          const secondData = await secondResponse.json();
          finalData.push({
            print_name: secondData.name,
            character_name: firstData[i],
            character_type: secondData.weapon,
            character_url: newUrl,
          });
        }
        // need to stringify array of objects for localStorage
        // will eventually need to be parsed for array mapping
        localStorage.setItem("characters", JSON.stringify(finalData));
        setInactiveTeamMembers(localStorage.getItem("characters"));
      }
      // for populating weapons
      else if (string === "weapons") {
        for (let i = 0; i < firstData.length; i++) {
          const newUrl = url + "/" + firstData[i];
          const secondResponse = await fetch(newUrl);
          const secondData = await secondResponse.json();
          finalData.push({
            print_name: secondData.name,
            weapon_name: firstData[i],
            weapon_type: secondData.type,
            weapon_url: newUrl,
          });
        }
        localStorage.setItem("weapons", JSON.stringify(finalData));
        setWeapons(localStorage.getItem("weapons"));
      }
      // for populating artifacts
      else if (string === "artifacts") {
        for (let i = 0; i < firstData.length; i++) {
          const newUrl = url + "/" + firstData[i];
          const secondResponse = await fetch(newUrl);
          const secondData = await secondResponse.json();
          //
          finalData.push({
            print_name: secondData.name,
            artifact_name: firstData[i],
            artifact_bonus_1: secondData["2-piece_bonus"],
            artifact_bonus_2: secondData["4-piece_bonus"],
          });
        }
        localStorage.setItem("artifacts", JSON.stringify(finalData));
        setArtifacts(localStorage.getItem("artifacts"));
      } else {
        alert("something went wrong with populating the data somewhere...");
        console.log("something went wrong somewhere...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle changes in user input
  const handleSelectSlot = (e) => {
    setTeamSlot(e.target.value);
  };

  const handleSelectCharacter = (e) => {
    // supposed to allow for another attribute of option to be passed to the select element
    const extraData = e.target.options[e.target.selectedIndex];
    setChosenMember({
      name: e.target.value,
      type: extraData.getAttribute("type"),
    });
  };

  // triggers populating of data
  useEffect(() => {
    if (inactiveTeamMembers === null) {
      populate(characters_url, "characters");
    }
    if (weapons === null) {
      populate(weapons_url, "weapons");
    }
    if (artifacts === null) {
      populate(artifacts_url, "artifacts");
    }
  }, []);

  return (
    <div className="teamTable">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Teammate />
        <Teammate />
        <Teammate />
        <Teammate />
      </div>
      <hr /> <br />
      <form action="">
        {/* first step: prompting team slot */}
        <label htmlFor="characterSlot">Choose A Character Slot: </label>
        <select
          name="characterSlot"
          value={teamSlot}
          onChange={handleSelectSlot}
        >
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          {/* always only 4 slots - can never be more*/}
        </select>

        {/* once team slot is chosen */}
        {teamSlot !== "" ? (
          <>
            <label htmlFor="chooseCharacter">Choose Your Character: </label>
            <select
              name="chooseCharacter"
              value={chosenMember.name}
              onChange={handleSelectCharacter}
            >
              <option value=""></option>
              {inactiveTeamMembers && inactiveTeamMembers.length > 0 ? (
                <>
                  {JSON.parse(inactiveTeamMembers).map((teamMember) => {
                    return (
                      <option
                        value={teamMember.character_name}
                        type={teamMember.character_type}
                      >
                        {teamMember.print_name}
                      </option>
                    );
                  })}
                </>
              ) : (
                <>Error somewhere...</>
              )}
            </select>
          </>
        ) : (
          <></>
        )}

        {/* once character is selected + populates based on chosen character's weapon type*/}
        {teamSlot !== "" && chosenMember !== "" ? (
          <>
            <label htmlFor="chooseWeapon">Equip A Weapon: </label>
            <select name="chooseWeapon">
              <option value=""></option>
              {weapons && weapons.length > 0 ? (
                <>
                  {JSON.parse(weapons).map((weapon) => {
                    return (
                      <>
                        {/* if character's weapon type matches the weapon's own type*/}
                        {chosenMember.type === weapon.weapon_type ? (
                          <option value={weapon.weapon_name}>
                            {weapon.print_name}
                          </option>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <>Error somewhere...</>
              )}
            </select>
          </>
        ) : (
          <></>
        )}

        {/*once weapon is selected, display prompt for artifact*/}

        {/*once first artifact is displayed, display prompt for 2-piece*/}

        {/*if 2-piece is true, prompt for another artifact, else prompt submit button*/}

        {/* <label htmlFor="chooseArtifact">Equip An Artifact Set: </label>
        <select name="chooseArtifact"> */}
        {/* will be dynamically populated later */}
        {/* <option value="Nobless">Nobless</option>
          <option value="Noblessee">Noblessee</option>
        </select>
        <label htmlFor="isTwoPiece">Use only Two-piece sets?</label>
        <input type="checkbox" name="isTwoPiece" />
        <label htmlFor="chooseSecond">Equip A Second Artifact Set: </label>
        <select name="chooseSecond"> */}
        {/* will be dynamically populated EXCLUDING WHAT WAS SELECTED FOR FIRST ARTIFACT later */}
        {/* <option value="Nobless">Nobless</option>
          <option value="Noblessee">Noblessee</option>
        </select>*/}
      </form>
      <p>elemental bonuses listed here</p>
    </div>
  );
}
