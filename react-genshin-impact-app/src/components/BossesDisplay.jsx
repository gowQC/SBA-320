import BossCard from "./BossCard";

export default function BossesDisplay({ bosses }) {
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
          <ul className="bossesDisplay">
            {bosses.map((boss, index) => {
              return (
                <BossCard
                  url={url + "/" + boss}
                  name={boss}
                  printName={bossNameConversions[boss]}
                />
              );
            })}
          </ul>
          <button className="carousel-button prev">prev</button>
          <button className="carousel-button next">next</button>
        </>
      ) : (
        <p>No bosses seem to be available for display...</p>
      )}
    </div>
  );
}
