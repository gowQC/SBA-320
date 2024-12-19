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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacters(url);
  }, []);

  return (
    <>
      <CharactersDisplay characters={characters} />
    </>
  );
}
