import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonButton, IonText } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Overview.css";
import { useParams } from "react-router-dom";

const Overview: React.FC = () => {
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"','');
  const userLink = localStorage.getItem("userLink")?.replaceAll('"','');

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>
          Agenda <br /> erstellen
        </h2>
        <IonButton href="/Editing" shape="round" size="large" id="oben">
          genauere Bearbeitung
        </IonButton>
        <IonText>
          <h5>LogIn-ID für Moderator</h5>
          <p>{adminLink}</p>
        </IonText>
        <h5>LogIn-ID für Teilnehmer</h5>
        <p>{userLink}</p>
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