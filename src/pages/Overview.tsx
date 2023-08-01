import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonButton, IonText, IonItem } from "@ionic/react";
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
          Agenda erstellen
        </h2> 
        <IonButton href="/Editing" expand="block" shape="round" size="large" id="oben">
          genauere Bearbeitung
        </IonButton>
       
        <IonText>
        <IonItem>
        <p>{adminLink}</p>
        </IonItem>
          <h5>LogIn-ID für Moderator</h5>
          <IonItem>
        <p>{userLink}</p>
        </IonItem>
        <h5>LogIn-ID für Teilnehmer</h5>
        </IonText>
        <IonButton href="/Suggestions" expand="block" shape="round" size="large" id="vorschlag-b">
          Vorschläge
        </IonButton>
        <IonButton href="/WatchStart" expand="block" shape="round" size="large" id="meeting-b">
          Meeting starten
        </IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Overview;