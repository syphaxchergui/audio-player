import React from "react";
import "./album.css";
import { Link } from "react-router-dom";
const Album = ({ _id, cover, title, artistId, year, slug }) => {
  return (
    <div className="album-container">
      <Link to={`/albums/${slug}`}>
        <img loading="lazy" className="img-album" src={cover} />
      </Link>

      <div style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>
        <Link to={`/albums/${slug}`}>
          <h6
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "8rem",
              cursor: "pointer",
            }}
          >
            {title}
          </h6>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: -10,
            maxWidth: "12rem",
          }}
        >
          <p
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "6.5rem",
            }}
          >
            {artistId.firstName + " " + artistId.lastName}
          </p>
          <p>{year}</p>
        </div>
      </div>
    </div>
  );
};

export default Album;
