import { useState, useEffect } from "react";
import BossesDisplay from "../components/BossesDisplay";

export default function BossesPage() {
  const [bosses, setBosses] = useState([]);

  const url = "https://genshin.jmp.blue/boss/weekly-boss";

  const getBosses = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBosses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBosses(url);
  }, []);

  return <BossesDisplay bosses={bosses} />;
}
