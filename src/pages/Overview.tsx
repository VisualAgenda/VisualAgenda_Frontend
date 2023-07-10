import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonButton, IonText } from "@ionic/react";

import ExploreContainer from "../components/ExploreContainer";
import "./Overview.css";
import "./Home";
import "./Suggestions";
import "./MeetingStart";

// TODO hier muss dann die daten uebergeben werden oder ein neuer get request gemacht werden auf die API musst mir sagen wie du es willst
// wenn neuer get request musst du den admin_link oder den user_link uebergeben. aber das waere dann das selbe wie bei home.

const Overview: React.FC = () => {
  const storedNumbers = localStorage.getItem("randomNumbers");
  const { number1 = 0, number2 = 0 } = storedNumbers
    ? JSON.parse(storedNumbers)
    : {};

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <h2>
          Agenda <br></br>erstellen
        </h2>
        <IonButton href="/Editing" shape="round" size="large" id="oben">
          genauere Bearbeitung
        </IonButton>
        <IonText>
          <h5>LogIn-ID für Moderator</h5>
          <p>{number1}</p>
        </IonText>
        <h5>LogIn-ID für Teilnehmer</h5>
        <p>{number2}</p>
        <IonButton href="/Suggestions" shape="round" size="large" id="vorschlag-b">
          Vorschläge
        </IonButton>
        <IonButton href="/MeetingStart" shape="round" size="large" id="meeting-b">
          Meeting starten
        </IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Overview;
