import React, { useState, useEffect } from "react";
import {
  IonProgressBar,
  IonButton,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../pages/Watch";
import "./TimeBar.css";

const TimeBar = () => {
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const history = useHistory();
  const startProgress = () => {
    if (intervalId === null) {
      const id = window.setInterval(() => {
        setProgress((prevProgress) => prevProgress + 0.01);
      }, 100);
      setIntervalId(id);
    }
  };
  const stopProgress = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };
  const navigateToNextPage = () => {
    history.push("/Watch"); // Hier wird die URL der nächsten Seite angegeben
  };
  useEffect(() => {
    if (progress >= 1) {
      stopProgress();
    }
  }, [progress]);

  return (
    <div>
      <div className="container_row">
        <IonText class="text"> Thema A </IonText>
        <IonRouterLink onClick={navigateToNextPage}>
          <IonProgressBar
            class="bar"
            value={progress}
            style={{ height: "40px" }}
          ></IonProgressBar>
        </IonRouterLink>
      </div>
      <div className="container_row">
        <IonText class="text"> Thema A </IonText>
        <IonRouterLink onClick={navigateToNextPage}>
          <IonProgressBar
            class="bar"
            value={progress}
            style={{ height: "40px" }}
          ></IonProgressBar>
        </IonRouterLink>
        
      </div>
      <div>
      <IonButton onClick={startProgress}>Start</IonButton>
        <IonButton onClick={stopProgress}>Stop</IonButton>
      </div>
    </div>
  );
};

export default TimeBar;

