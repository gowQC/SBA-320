import { useState, useEffect } from "react";
import CharactersDisplay from "../components/CharactersDisplay";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState("");

  const url = "https://genshin.jmp.blue/characters";

  const getCharacters = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.log(error);
    }
  };

  // gathers list of characters from api
  useEffect(() => {
    getCharacters(url);
  }, []);

  // sends characters array to component
  return <CharactersDisplay characters={characters} />;
}
