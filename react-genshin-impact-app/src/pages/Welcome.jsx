import zhongli from "../images/zhongli.webp";
import childe from "../images/childe.webp";
import travelers from "../images/travelers.webp";

export default function Welcome() {
  return (
    <div
      style={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Genshin Impact Application</h1>
      <h3>
        Welcome to my Genshin Impact Application! Here, you can search for your
        favorite characters, search the weekly bosses, and even build your own
        dream team!{" "}
      </h3>
      <div className="imgContainer">
        <div>
          <img src={zhongli} alt="Image of Zhongli from Genshin Impact." />
          <p>
            Take a look at all the playable characters Genshin Impact has to
            offer! You can check out a character's element, what weapon they
            use, and see what rarity they are.
          </p>
        </div>
        <div>
          <img
            src={childe}
            alt="Image of Childe as a boss enemy in Genshin Impact."
          />
          <p>
            See what bosses you may run into in your playthrough! Explore some
            of the lore of these bosses see what unique items they'll drop.
          </p>
        </div>
        <div>
          <img
            src={travelers}
            alt="Male and female main character for Genshin Impact."
          />
          <p>
            Optimize your dream team with whoever you want! Design team layouts,
            equip weapons, and draft your perfect artifact sets for your perfect
            team.
          </p>
        </div>
      </div>
    </div>
  );
}
