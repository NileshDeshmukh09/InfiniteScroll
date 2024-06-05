import { useEffect, useState, useCallback, useRef } from "react";
import { MemeCard } from "./MemeCard";
import Shimmer from "./Shimmer";
import { memeURL } from "../url";

const Body = () => {
  const [memes, setMemes] = useState([]);
  const [showShimmer, setShowShimmer] = useState(false);
  const initialFetchDone = useRef(false);  // Use ref to track initial fetch

  const fetchMemes = useCallback(async () => {
    setShowShimmer(true);
    try {
      const data = await fetch(memeURL);
      const json = await data.json();
      setMemes((prevMemes) => [...prevMemes, ...json.memes]);
    } catch (error) {
      console.error("Failed to fetch memes:", error);
    } finally {
      setShowShimmer(false);
    }
  }, []);

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchMemes();
      initialFetchDone.current = true;
    }

    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
        fetchMemes();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMemes]);

  return (
    <>
      <h1>Total Memes: {memes.length}</h1>
      <div className="flex justify-center flex-wrap">
        {memes.map((meme, i) => (
          <MemeCard key={i} data={meme} />
        ))}

        {showShimmer && <Shimmer />}
      </div>
    </>
  );
};

export default Body;
