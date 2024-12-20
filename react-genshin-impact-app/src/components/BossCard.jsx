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
        <div className="bossCard" key={name}>
          <h1>{printName}</h1>
          <img
            src={url + "/icon"}
            alt={"Portrait of " + printName}
            style={{
              height: "240px",
              width: "240px",
              borderRadius: "20px",
              border: "2px solid black",
            }}
          />
          <p>{bossProperties.description}</p>
          <h2>Boss Drops</h2>
          <BossDrops url={url} drops={bossProperties.drops} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
