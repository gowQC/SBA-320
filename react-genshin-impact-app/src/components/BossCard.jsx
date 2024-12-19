import BossDrops from "./BossDrops";
import { useState, useEffect } from "react";

export default function BossCard({ url, name, printName }) {
  const [bossProperties, setBossProperties] = useState("");

  const getBossProperties = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBossProperties(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBossProperties(url);
  }, [url]);

  return (
    <>
      {url ? (
        <li className="bossCard" key={name}>
          <h1>{printName}</h1>
          <img
            src={url + "/icon"}
            alt={"Portrait of " + printName}
            style={{ borderRadius: "20px", border: "2px solid black" }}
          />
          <h3>{bossProperties.description}</h3>
          <h2>Boss Drops</h2>
          <BossDrops url={url} drops={bossProperties.drops} />
        </li>
      ) : (
        <></>
      )}
    </>
  );
}
