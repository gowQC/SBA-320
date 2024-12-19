import CharacterCard from "./CharacterCard";

export default function CharactersDisplay({ characters }) {
  const url = "https://genshin.jmp.blue/characters/";

  return (
    <>
      {characters && characters.length > 0 ? (
        <ul className="charactersDisplay">
          {characters.map((character) => {
            //we want to send a character-specific url to each CharacterCard
            return <CharacterCard url={url + character} />;
          })}
        </ul>
      ) : (
        <p>We can't seem to find any characters...</p>
      )}
    </>
  );
}
