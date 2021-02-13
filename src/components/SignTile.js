import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import "firebase/firestore";
import { db } from "../firebase";
import "./Signs.css";
import { GridListTileBar } from "@material-ui/core";

function SignTile({ index, tile }) {
  const { dbUser, getDbUser } = useUser();
  const [showL, setShowL] = useState(false);
  const [showP, setShowP] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    // setShowL(!showL);
    setShowP(!showP);
  };

  return (
    <GridListTileBar onClick={handleClick} className="gltb"
      background="rgb(255 255 255 / 50%)"
      height="10%"
      title={showP && <span >{tile.letter}</span>}
    />
  );
}
export default SignTile;

