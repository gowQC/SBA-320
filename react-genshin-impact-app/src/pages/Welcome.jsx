import zhongli from "../images/zhongli.webp";
import childe from "../images/childe.webp";
import travelers from "../images/travelers.webp";

export default function Welcome() {
  return (
    <>
      <h1>Genshin Impact Application</h1>
      <h3>
        Welcome to my Genshin Impact Application! Here, you can search for your
        favorite characters, search the weekly bosses, and even build your own
        dream team!{" "}
      </h3>
      <div className="imgContainer">
        <img src={zhongli} alt="Image of Zhongli from Genshin Impact." />
        <img
          src={childe}
          alt="Image of Childe as a boss enemy in Genshin Impact."
        />
        <img
          src={travelers}
          alt="Male and female main character for Genshin Impact."
        />
      </div>
    </>
  );
}
