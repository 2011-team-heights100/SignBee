import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";
import { useUser } from "../contexts/UserContext";

let counter = 0;

export default function GameSummary(props) {
  document.body.style = "background: #F6A400;";

  const history = useHistory();
  const {
		dbUser,
		getDbUser,
		getLevels,
		levels,
		currentLevel,
		setCurrentLevel,
		setPlayerPoints,
		updateProgress,
		difficulty,
		defineDifficulty,
		updateLastPlayed,
		updateStreak,
	} = useUser();
  // const [totalPts, setTotalPts] = useState();

  useEffect(() => {
    getDbUser()
  }, [])

  useEffect(() => {
    // getDbUser();
    updateLastPlayed()
    updateStreak()
    getLevels();
    return () => (counter = 0);
  }, []);

  console.log("gameplaysummary", currentLevel);

  const addPoints = async () => {
    counter++;
    if (
      difficulty === "text" &&
      props.location.state.maxPts === props.location.state.totalPts
    ) {
      props.location.state.totalPts++;
    }
    let userPoints = await dbUser.points;
    let newTotal = userPoints + props.location.state.totalPts;
    await setPlayerPoints(newTotal);
    // await setTotalPts(newTotal);
    if (props.location.state.totalPts >= props.location.state.maxPts) {
      await updateProgress(currentLevel.name, difficulty);
    }
  };
  console.log("dbUser:", dbUser);

  if (counter < 2) {
    dbUser && addPoints();
  }

  async function handlePlayNext() {
    await setCurrentLevel(levels[currentLevel.name]);
    await defineDifficulty(currentLevel.name);
    //not recognizing difficulty right away
    if (
			dbUser.progress[currentLevel.name].easy &&
			dbUser.progress[currentLevel.name].medium &&
			dbUser.progress[currentLevel.name].hard &&
			!dbUser.progress[currentLevel.name].text
		) {
			history.push({
				pathname: "/gameplaytext",
			});
		} else {
			history.push("/app");
		}
  }

  function handleReplay() {
    if (difficulty === "text") {
      history.push({
        pathname: "/gameplaytext",
      });
    } else {
      history.push("/app");
    }
  }

  const allLevelsComplete =
		dbUser.progress[currentLevel.name].easy &&
		dbUser.progress[currentLevel.name].medium &&
		dbUser.progress[currentLevel.name].hard &&
		dbUser.progress[currentLevel.name].text;

  return (
    <div className="game-summary-container">
      <div className="game-summary">
        {props.location.state.totalPts === 0 && (
          <Typography variant="h2">Oh boy...</Typography>
        )}
        {props.location.state.totalPts === props.location.state.maxPts && (
          <Typography variant="h2">Well Done!</Typography>
        )}
        {props.location.state.totalPts < props.location.state.maxPts && (
          <Typography variant="h2">Try Again!</Typography>
        )}
        {props.location.state.totalPts > props.location.state.maxPts && (
          <>
					<Typography variant="h2">Section Complete!</Typography>
					<Typography variant="h6">Enjoy an extra point. You deserve it!</Typography></>
        )}
        <Typography variant="h5">
          Your Score: {props.location.state.totalPts}
        </Typography>
        <Typography variant="h5">Total Points: {dbUser.points}</Typography>
        <GradeIcon color="primary" style={{ fontSize: 100 }}></GradeIcon>
        <br />
        {(props.location.state.totalPts === props.location.state.maxPts && !allLevelsComplete) && (
          <Button onClick={handlePlayNext}>Next</Button>
        )}

        <Button variant="outlined" onClick={handleReplay}>
          Play Again
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            history.push("/dashboard");
            window.location.reload();
          }}
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
}
