import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import "firebase/firestore";
import { db } from "../firebase";
import "./Signs.css";
import { Grid, GridList, GridListTile } from "@material-ui/core";

function Signs() {
  const { dbUser, getDbUser } = useUser();
  const [showL, setShowL] = useState(false);
  const [showP, setShowP] = useState(true);
  const [list, setList] = useState([]);

  function getLearn() {
    const learnsec = db
      .collection("Sections")
      .doc("Learn")
      .get()
      .then((snapshot) => {
        const prompts = snapshot.data().prompts;
				let newPrompts= prompts.slice(0,13)
        setList(newPrompts);
      });
  }

  useEffect(() => {
    getLearn();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setShowL(!showL);
    setShowP(!showP);
  };

return (

	<Grid className="grid">
	<GridList
	 cellHeight={100} cellWidth={100} cols={3}>
  {list.map((tile, index) => (
    <GridListTile onclick={handleClick} key={index} >
			{showP?
      <img className="imgs" src={tile.picture} alt={tile.letter} />:
		tile.letter}
	</GridListTile>
  ))}
</GridList>
</Grid>

)
}

export default Signs;





  // return (
  //   <div id="hexGrid-LP">
  //     <div className="row-LP">
  //       <div className="hexagon-content-LP" onClick={handleClick}>
  //         <div className="content-title-LP">
  //           {list[0] &&
  //             (showL ? (
  //               list[0].letter
  //             ) : (
  //               <img
  //                 id="prompt-imgL"
  //                 src={list[0].picture}
  //                 alt={list[0].letter}
  //               />
  //             ))}
  //         </div>
  //       </div>

  //       {/* <HoneyComb name="LEARN" /> */}
  //     </div>
  //     <div className="row-LP">
	// 		<div className="hexagon-content-LP" onClick={handleClick}>
  //         <div className="content-title-LP">
  //           {list[1] &&
  //             (showL ? (
  //               list[1].letter
  //             ) : (
  //               <img
  //                 id="prompt-imgL"
  //                 src={list[1].picture}
  //                 alt={list[1].letter}
  //               />
  //             ))}
  //         </div>
  //       </div>
  //       {/* <HoneyComb name="ABCD" />
  //       <HoneyComb name="EFGH" /> */}
  //     </div>
  //     <div className="row-LP">
  //       {/* <HoneyComb name="IJKL" />
  //       <HoneyComb name="MNOP" />
  //       <HoneyComb name="QRST" /> */}
  //     </div>
  //     <div className="row-LP">
  //       {/* <HoneyComb name="UVW" />
  //       <HoneyComb name="XYZ" /> */}
  //     </div>
  //     <div className="row-LP"></div>
  //     <div className="row-LP"></div>
  //     <div id="info"></div>
  //   </div>
  // );

  // return (
  // 	<div className="Signs">
  //   <div id="hexGrid-LP">
  //     <div className="row-LP">
  //       <div className="hexagon hexagon-with-border warning">
  //         <div className="hexagon-shape">
  //           <div className="hexagon-shape-inner">
  //             <div className="hexagon-shape-inner-2"></div>
  //           </div>
  //         </div>
  //         {percent < 1 && (
  //           <div className="hexagon-shape content-panel">
  //             <div className="hexagon-shape-inner">
  //               <div className="hexagon-shape-inner-2"></div>
  //             </div>
  //           </div>
  //         )}
  //         {percent > 0 && percent < 1 && (
  //           <div className="hexagon-shape content-panel-some-action">
  //             <div className="hexagon-shape-inner">
  //               <div className="hexagon-shape-inner-2"></div>
  //             </div>
  //           </div>
  //         )}
  //         <div className="hexagon-content" onClick={handleClick}>
  //           <div className="content-title">
  //             {list[0] &&
  //               (showL ? (
  //                 list[0].letter
  //               ) : (
  //                 <img
  //                   id="prompt-imgL"
  //                   src={list[0].picture}
  //                   alt={list[0].letter}
  //                 />
  //               ))}
  //           </div>
  //           {/* <div className="content-title">{list[0] && (list[0].letter,
  // 			<img id="prompt-imgL"
  //                   src={list[0].picture}
  //                   alt={list[0].letter}
  //                 />)}
  // 								</div> */}
  //         </div>
  //       </div>
  //     </div>
  //   </div></div>
  // );

