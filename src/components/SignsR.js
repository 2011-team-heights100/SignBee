import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import "firebase/firestore";
import { db } from "../firebase";
import "./Signs.css";
import { Grid, GridList, GridListTile } from "@material-ui/core";
import SignTile from "./SignTile";

function SignsR() {
  const { dbUser, getDbUser } = useUser();
  const [list, setList] = useState([]);

  function getLearn() {
    const learnsec = db
      .collection("Sections")
      .doc("Learn")
      .get()
      .then((snapshot) => {
        const prompts = snapshot.data().prompts;
        const newPrompts = prompts.slice(13, 26);
        console.log(prompts);
        setList(newPrompts);
      });
  }

  useEffect(() => {
    getLearn();
  }, []);


  return (
    <>
      <Grid className="grid">
        <GridList cellHeight={100} cellWidth={100} cols={3}>
          {list.map((tile, index) => (
             <GridListTile  key={index} cols={tile.cols || 1} >
                       <img src={tile.picture} alt={tile.letter} />
               <SignTile tile={tile} index={index} />
             </GridListTile>
          ))}
        </GridList>
      </Grid>
    </>
  );
}
export default SignsR;
