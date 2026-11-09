"use client";

import { useState } from "react";

function TombolFavorit() {
  const [favorit, setFavorit] = useState(false);

  function cekFavorit() {
    if (favorit) {
      return "cursor-pointer rounded-full border border-(--merah) bg-(--merah) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--maroon) motion-safe:hover:scale-105 motion-safe:active:scale-95";
    } else {
      return "cursor-pointer rounded-full border border-(--merah) bg-white px-4 py-2 text-sm font-semibold text-(--maroon) transition hover:bg-(--pink) motion-safe:hover:scale-105 motion-safe:active:scale-95";
    }
  }

  function teksFavorit() {
    if (favorit) {
      return "♥ Favorite";
    } else {
      return "♡ Favorite";
    }
  }

  return (
    <button onClick={() => setFavorit(!favorit)} className={cekFavorit()}>
      {teksFavorit()}
    </button>
  );
}

export default TombolFavorit;
