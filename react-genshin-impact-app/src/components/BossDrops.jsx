import { useState, useEffect } from "react";

export default function BossDrops({ url, drops }) {
  const convert = (drop) => {
    // changes capital letters to lowercase + changes spaces to hyphens + changes apostrophes to hyphens, used for new url
    return drop.toLowerCase().replace(/[\s']/g, "-");
  };

  return (
    <div className="bossDropsContainer">
      {/* bosses only drop 3 different boss drop items, so statically calling for 3 images works */}
      {drops && drops.length > 0 ? (
        <>
          <img
            src={url + "/" + convert(drops[0].name)}
            alt={`Image of ${drops[0].name}`}
          />
          <img
            src={url + "/" + convert(drops[1].name)}
            alt={`Image of ${drops[1].name}`}
          />
          <img
            src={url + "/" + convert(drops[2].name)}
            alt={`Image of ${drops[2].name}`}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
