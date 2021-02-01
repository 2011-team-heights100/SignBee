import React  from "react";
import { useHistory } from "react-router-dom"
//or get levels and map through

const Alphabet = () => {
  //const [ setLevel]= useState("");
  const history = useHistory();

const levelChoice= (page)=>{
 let curLevel =page;
 history.push({
   pathname:"/appdemo",
    // search: `?query=${curLevel}`,
    state: { curLevel }
  })
}

const dashboard = ()=>{
  history.push("/dashboard")
}

  return (
    <>
    <div>
      <div>choose a level</div>
      <div>honeycomb

      </div>
      <div>honeycomb
      <button id="1" onClick={()=>levelChoice("ABCDE")}>ABCDE</button>
        </div>
        <div>honeycomb
      <button id="2" onClick={()=>levelChoice("FGHIJ")}>FGHIJ</button>
        </div>
        <div>honeycomb
      <button id="3" onClick={()=>levelChoice("KLMNO")}>KLMNO</button>
        </div>
        <div>honeycomb
      <button id="4" onClick={()=>levelChoice("PQRST")}>PQRST</button>
        </div>
        <div>honeycomb
      <button id="5" onClick={()=>levelChoice("UVWXYZ")}>UVWXYZ</button>
        </div>

      </div>
      <div>
      <button onClick={dashboard}>Back to Dashboard</button>
        </div>
    </>
  )
};



export default Alphabet;
