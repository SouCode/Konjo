"use client";

import React from "react";
import styles from "./profileWidget.module.css";

interface ProfileWidgetProps {
  genres: string[];
  artists: string[];
}

const ProfileWidget: React.FC<ProfileWidgetProps> = ({ genres, artists }) => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <div className={styles.profilePic}>Profile Pic</div>
        <div className={styles.info}>
          <p>Followers: 300</p>
          <p>Following: 200</p>
        </div>
        <button className={styles.settingsButton}>⚙</button>
      </div>

      <h3 className={styles.sectionTitle}>Your Favorite Artists</h3>
      <div className={styles.artistGrid}>
        {artists.map((artist) => (
          <div key={artist} className={styles.artistBox}>
            {artist}
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>Your Favorite Genres</h3>
      <div className={styles.genreGrid}>
        {genres.map((genre) => (
          <div key={genre} className={styles.genreBox}>
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileWidget;
