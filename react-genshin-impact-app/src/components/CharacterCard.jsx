import { useState, useEffect } from "react";
import rarityStar from "../images/rarity_star_icon.webp";

export default function CharacterCard({ url }) {
  const [characterProperties, setCharacterProperties] = useState("");

  const getCharacterProperties = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacterProperties(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacterProperties(url);
  }, []);

  const colorPicker = {
    Pyro: "red",
    Cryo: "lightblue",
    Electro: "purple",
    Hydro: "blue",
    Anemo: "lightgreen",
    Geo: "yellow",
    Dendro: "green",
  };

  const renderStars = (rarity) => {
    const stars = [];
    for (let i = 0; i < rarity; i++) {
      stars.push(
        <img
          src={rarityStar}
          alt={rarity + " star rarity symbolized by " + rarity + " stars."}
        />
      );
    }
    return stars;
  };

  return (
    <>
      {url ? (
        <li
          className="characterCard"
          key={characterProperties.name}
          style={{ backgroundColor: colorPicker[characterProperties.vision] }}
        >
          <h2>{characterProperties.name}</h2>
          <h3>
            {characterProperties.vision} {characterProperties.weapon} User
          </h3>
          <img
            src={url + "/icon"}
            alt={`Portrait of ${characterProperties.name}.`}
          />
          <div className="starsContainer">
            {renderStars(characterProperties.rarity)}
          </div>
        </li>
      ) : (
        <></>
      )}
    </>
  );
}
