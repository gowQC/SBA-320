import { useState, useEffect } from "react";
import Teammate from "./Teammate";

export default function TeamTable() {
  // will store active team members
  const [activeTeamMembers, setActiveTeamMembers] = useState([]);
  const [inactiveTeamMembers, setInactiveTeamMembers] = useState([]);

  const url = "https://genshin.jmp.blue/characters";

  const populateCharacterList = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // filter data and remove any of active team members
      const filteredData = data.filter(
        (item) => !activeTeamMembers.includes(item)
      );
      setInactiveTeamMembers(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const capitalize = (member) => {
    return member.charAt(0).toUpperCase() + member.slice(1);
  };

  useEffect(() => {
    populateCharacterList(url);
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
      <label htmlFor="characterSlot">Choose A Character Slot: </label>
      <select name="characterSlot">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <label htmlFor="chooseCharacter">Choose Your Character: </label>
      <select name="chooseCharacter">
        {inactiveTeamMembers && inactiveTeamMembers.length > 0 ? (
          <>
            {inactiveTeamMembers.map((teamMember) => {
              return (
                <option value={teamMember}>{capitalize(teamMember)}</option>
              );
            })}
          </>
        ) : (
          <>Error somewhere...</>
        )}
      </select>
      <hr /> <br />
      <label htmlFor="chooseWeapon">Equip A Weapon: </label>
      <select name="chooseWeapon">
        {/* will be dynamically populated BASED ON CHOSEN CHARACTER later */}
        <option value="Sword">Sword</option>
        <option value="Catalyst">Catalyst</option>
      </select>
      <label htmlFor="chooseArtifact">Equip An Artifact Set: </label>
      <select name="chooseArtifact">
        {/* will be dynamically populated later */}
        <option value="Nobless">Nobless</option>
        <option value="Noblessee">Noblessee</option>
      </select>
      <label htmlFor="isTwoPiece">Use only Two-piece sets?</label>
      <input type="checkbox" name="isTwoPiece" />
      <label htmlFor="chooseSecond">Equip A Second Artifact Set: </label>
      <select name="chooseSecond">
        {/* will be dynamically populated EXCLUDING WHAT WAS SELECTED FOR FIRST ARTIFACT later */}
        <option value="Nobless">Nobless</option>
        <option value="Noblessee">Noblessee</option>
      </select>
      <p>elemental bonuses listed here</p>
    </div>
  );
}
