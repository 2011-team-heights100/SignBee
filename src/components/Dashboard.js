import React, { useEffect } from "react";
import HoneyComb from "./HoneyComb";
import { useUser } from "../contexts/UserContext";

export default function Dashboard() {
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
    </div>
  );
}
