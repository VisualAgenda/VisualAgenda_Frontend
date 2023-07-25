import React, { useEffect, useState } from "react";
import { IonContent, IonPage, IonButton, IonText } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Overview.css";
import { useParams } from "react-router-dom";

const Overview: React.FC = () => {
  // Zustände für die Links
  const [adminLink, setAdminLink] = useState("");
  const [userLink, setUserLink] = useState("");

  useEffect(() => {
    // Lade die Links aus dem lokalen Speicher, wenn die Komponente montiert wird
    const adminLinkFromLocalStorage = localStorage.getItem("adminLink");
    const userLinkFromLocalStorage = localStorage.getItem("userLink");

    // Setze die Links in den Zuständen
    setAdminLink(adminLinkFromLocalStorage || "");
    setUserLink(userLinkFromLocalStorage || "");
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>
          Agenda <br /> erstellen
        </h2>
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