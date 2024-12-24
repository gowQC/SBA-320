import CharacterCard from "./CharacterCard";

export default function CharactersDisplay({ characters }) {
  const url = "https://genshin.jmp.blue/characters/";

  return (
    <>
      {/*based on characters retrieved from CharactersPage, send newly constructed/character-specific url to component*/}
      {characters && characters.length > 0 ? (
        <ul className="charactersDisplay">
          {characters.map((character) => {
            return <CharacterCard url={url + character} />;
          })}
        </ul>
      ) : (
        <p>We can't seem to find any characters...</p>
      )}
    </>
  );
}
