import React, { useEffect } from "react";
import HoneyComb from "./HoneyComb";
import { useUser } from "../contexts/UserContext";

export default function Dashboard() {
  document.body.style = "background: #FEF5E4";

  const { getDbUser } = useUser();

  useEffect(() => {
    getDbUser();
  }, []);

  return (
    <div id="hexGrid">
      <div className="row">
        <HoneyComb name="LEARN" />
      </div>
      <div className="row">
        <HoneyComb name="ABCD" />
        <HoneyComb name="EFGH" />
      </div>
      <div className="row">
        <HoneyComb name="IJKL" />
        <HoneyComb name="MNOP" />
        <HoneyComb name="QRST" />
      </div>
      <div className="row">
        <HoneyComb name="UVW" />
        <HoneyComb name="XYZ" />
      </div>
      <div className="row">
        <img
          src={process.env.PUBLIC_URL + "/signbee_logo.svg"}
          id="bee-logo-dash"
          alt="beeLogo"
        />
        ;
      </div>
    </div>
  );
}
