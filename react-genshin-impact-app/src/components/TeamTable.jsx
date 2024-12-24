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

  // once all other local storage values are found, results to true
  const [isLoading, setIsLoading] = useState(true);

  // useState values for the form
  const [teamSlot, setTeamSlot] = useState("");
  const [chosenMember, setChosenMember] = useState("");
  const [weaponSlot, setWeaponSlot] = useState("");
  const [firstArtifact, setFirstArtifact] = useState("");
  const [twoArtifacts, setTwoArtifacts] = useState(false);
  const [secondArtifact, setSecondArtifact] = useState("");

  // the final data to be sent into the Teammate components
  const [firstTeammate, setFirstTeammate] = useState({});
  const [secondTeammate, setSecondTeammate] = useState({});
  const [thirdTeammate, setThirdTeammate] = useState({});
  const [fourthTeammate, setFourthTeammate] = useState({});

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

  const handleSelectWeapon = (e) => {
    setWeaponSlot(e.target.value);
  };

  const handleSelectFirstArtifact = (e) => {
    const extraData = e.target.options[e.target.selectedIndex];
    setFirstArtifact({
      name: e.target.value,
      firstbonus: extraData.getAttribute("firstbonus"),
    });
  };

  const handleTwoArtifacts = (e) => {
    setTwoArtifacts(e.target.checked);
  };

  const handleSelectSecondArtifact = (e) => {
    const extraData = e.target.options[e.target.selectedIndex];
    setSecondArtifact({
      name: e.target.value,
      firstbonus: extraData.getAttribute("secondbonus"),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // will contain all the information for the component to render
    const payload = {
      charUrl: characters_url + "/" + chosenMember.name + "/icon-big",
      weaponUrl: weapons_url + "/" + weaponSlot + "/icon",
      firstArtifactUrl:
        artifacts_url + "/" + firstArtifact.name + "/goblet-of-eonothem",
      secondArtifactUrl:
        artifacts_url + "/" + secondArtifact.name + "/goblet-of-eonothem",
    };
    // executed if no second artifact set is chosen
    if (secondArtifact.name === undefined) {
      payload.secondArtifactUrl = undefined;
    }
    if (teamSlot === "1") {
      setFirstTeammate(payload);
    } else if (teamSlot === "2") {
      setSecondTeammate(payload);
    } else if (teamSlot === "3") {
      setThirdTeammate(payload);
    } else if (teamSlot === "4") {
      setFourthTeammate(payload);
    } else {
      console.log("error somewhere with team slot...");
    }
  };

  // triggers populating of data
  useEffect(() => {
    const loadData = async () => {
      try {
        if (inactiveTeamMembers === null) {
          await populate(characters_url, "characters");
        }
        if (weapons === null) {
          await populate(weapons_url, "weapons");
        }
        if (artifacts === null) {
          await populate(artifacts_url, "artifacts");
        }
        setIsLoading(false);
      } catch (error) {
        console.log("error in loadData somewhere...");
      }
    };
    loadData();
  }, []);

  return (
    <>
      {/*if localStorage values are still loading*/}
      {isLoading === true ? (
        <h1 style={{ height: "85vh" }}>
          Loading data from API. Please wait...
        </h1>
      ) : (
        <div className="teamTable">
          {/*load normal content if assets loaded - each prompt displays next prompt, all the way until a submit button displays*/}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Teammate teammateData={firstTeammate} />
            <Teammate teammateData={secondTeammate} />
            <Teammate teammateData={thirdTeammate} />
            <Teammate teammateData={fourthTeammate} />
          </div>
          <br />
          <form onSubmit={handleSubmit}>
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
                <select
                  name="chooseWeapon"
                  value={weaponSlot}
                  onChange={handleSelectWeapon}
                >
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
            <br />
            {/*once weapon is selected, display prompt for artifact*/}
            {teamSlot !== "" && chosenMember !== "" && weaponSlot !== "" ? (
              <>
                <label htmlFor="chooseArtifact">
                  Equip First Artifact Set:{" "}
                </label>
                <select
                  name="chooseArtifact"
                  value={firstArtifact.name}
                  onChange={handleSelectFirstArtifact}
                >
                  <option value=""></option>
                  {artifacts && artifacts.length > 0 ? (
                    <>
                      {JSON.parse(artifacts).map((artifact) => {
                        return (
                          <option
                            value={artifact.artifact_name}
                            firstbonus={artifact.artifact_bonus_1}
                          >
                            {artifact.print_name}
                          </option>
                        );
                      })}
                    </>
                  ) : (
                    <>Error somewhere...</>
                  )}
                </select>{" "}
              </>
            ) : (
              <></>
            )}

            {/*once first artifact is displayed, display prompt for 2-piece*/}
            {teamSlot !== "" &&
            chosenMember !== "" &&
            weaponSlot !== "" &&
            firstArtifact !== "" ? (
              <>
                <label htmlFor="isTwoPiece">Use only Two-piece sets?</label>
                <input
                  type="checkbox"
                  name="isTwoPiece"
                  checked={twoArtifacts}
                  onChange={handleTwoArtifacts}
                />{" "}
              </>
            ) : (
              <></>
            )}

            {/*if 2-piece is true, prompt for another artifact, else prompt submit button*/}
            {teamSlot !== "" &&
            chosenMember !== "" &&
            weaponSlot !== "" &&
            firstArtifact !== "" &&
            twoArtifacts === true ? (
              <>
                <label htmlFor="chooseSecond">
                  Equip Second Artifact Set:{" "}
                </label>
                <select
                  name="chooseSecond"
                  value={secondArtifact.name}
                  onChange={handleSelectSecondArtifact}
                >
                  {/*dynamically populated EXCLUDING what was selected for first artifact*/}
                  {artifacts && artifacts.length > 0 ? (
                    <>
                      {JSON.parse(artifacts).map((artifact) => {
                        return (
                          <>
                            {artifact.artifact_name !== firstArtifact.name ? (
                              <option
                                value={artifact.artifact_name}
                                secondbonus={artifact.artifact_bonus_2}
                              >
                                {artifact.print_name}
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
            <br />
            {teamSlot !== "" &&
            chosenMember !== "" &&
            weaponSlot !== "" &&
            firstArtifact !== "" ? (
              <>
                <input type="submit" value={"Submit Teammate Info"} />
              </>
            ) : (
              <></>
            )}
          </form>
          {/* <p>elemental bonuses listed here</p> */}
        </div>
      )}
    </>
  );
}
