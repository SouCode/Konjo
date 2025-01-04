"use client";

import React, { useState } from "react";
import styles from "./onboardingWidget.module.css";

const genres = [
  "Rock",
  "Pop",
  "Hip-Hop",
  "Jazz",
  "Electronic",
  "Classical",
  "Country",
  "Reggae",
];

const onboardingWidget: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleNext = () => {
    if (selectedGenres.length === 0) {
      alert("Please select at least one genre.");
      return;
    }
    alert(`You selected: ${selectedGenres.join(", ")}`);
    // TODO: Implement artist selection step
  };

  return (
    <div className={styles.onboardingContainer}>
      <h2 className={styles.title}>Curate your profile taste: Choose your favorite genres</h2>
      <div className={styles.genresGrid}>
        {genres.map((genre) => (
          <div
            key={genre}
            className={`${styles.genreCard} ${
              selectedGenres.includes(genre) ? styles.selected : ""
            }`}
            onClick={() => toggleGenre(genre)}
          >
            <span>{genre}</span>
            {selectedGenres.includes(genre) && (
              <span className={styles.checkMark}>✓</span>
            )}
          </div>
        ))}
      </div>
      <button className={styles.nextButton} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default onboardingWidget;
