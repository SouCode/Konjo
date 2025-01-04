"use client";

import React, { useState } from "react";
import styles from "./onboardingWidget.module.css";

interface OnboardingWidgetProps {
  onComplete: (genres: string[], artists: string[]) => void;
}

const genres = [
  "Rock",
  "Pop",
  "Hip-hop",
  "Jazz",
  "Electronic",
  "Classical",
  "Country",
  "Reggae",
  "Latin",
  "Indie",
];

const artistsByGenre: Record<string, string[]> = {
  Rock: ["Queen", "The Beatles", "Led Zeppelin"],
  Pop: ["Taylor Swift", "Ariana Grande", "Ed Sheeran"],
  "Hip-hop": ["Kendrick Lamar", "Drake", "J. Cole"],
  Jazz: ["Miles Davis", "John Coltrane", "Louis Armstrong"],
  Electronic: ["Daft Punk", "Deadmau5", "Calvin Harris"],
  Classical: ["Mozart", "Beethoven", "Bach"],
  Country: ["Johnny Cash", "Dolly Parton", "Willie Nelson"],
  Reggae: ["Bob Marley", "Peter Tosh", "Burning Spear"],
  Latin: ["Shakira", "Bad Bunny", "J Balvin"],
  Indie: ["Arctic Monkeys", "Tame Impala", "The Strokes"],
};

const OnboardingWidget: React.FC<OnboardingWidgetProps> = ({ onComplete }) => {
  const [step, setStep] = useState<"genres" | "artists">("genres");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const toggleSelection = (
    item: string,
    setSelection: React.Dispatch<React.SetStateAction<string[]>>,
    currentSelection: string[]
  ) => {
    if (currentSelection.includes(item)) {
      setSelection(currentSelection.filter((g) => g !== item));
    } else {
      setSelection([...currentSelection, item]);
    }
  };

  const handleNext = () => {
    if (step === "genres") {
      if (selectedGenres.length === 0) {
        alert("Please select at least one genre.");
        return;
      }
      setStep("artists");
    } else {
      onComplete(selectedGenres, selectedArtists);
    }
  };

  return (
    <div className={styles.onboardingContainer}>
      <h2 className={styles.header}>
        {step === "genres"
          ? "Curate your profile taste: Choose your favorite genres"
          : "Curate your profile taste: Choose your favorite artists"}
      </h2>

      <div className={styles.genreGridWrapper}>
        <div className={styles.genreGrid}>
          {(step === "genres"
            ? genres
            : selectedGenres.flatMap((genre) => artistsByGenre[genre] || [])
          ).map((item) => (
            <div
              key={item}
              className={`${styles.genreBox} ${
                (step === "genres" ? selectedGenres : selectedArtists).includes(
                  item
                )
                  ? styles.selected
                  : ""
              }`}
              onClick={() =>
                toggleSelection(
                  item,
                  step === "genres" ? setSelectedGenres : setSelectedArtists,
                  step === "genres" ? selectedGenres : selectedArtists
                )
              }
            >
              {item}
              {(step === "genres" ? selectedGenres : selectedArtists).includes(
                item
              ) && <span className={styles.checkmark}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      <button className={styles.nextButton} onClick={handleNext}>
        {step === "genres" ? "Next" : "Finish"}
      </button>
    </div>
  );
};

export default OnboardingWidget;
