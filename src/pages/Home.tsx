import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonInput,
  IonItem,
} from "@ionic/react";
import "./Home.css";
import "./Overview";
import Background from "../components/Background";
import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
  const generateRandomNumbers = () => {
    const number1 = Math.floor(Math.random() * 10000000000);
    const number2 = Math.floor(Math.random() * 10000000000000);
    // Speichern Sie die generierten Zahlen in localStorage
    localStorage.setItem("randomNumbers", JSON.stringify({ number1, number2 }));
  };

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <Background />
        <h1>
          Visual <br></br>Agenda
        </h1>
        <IonButton onClick={generateRandomNumbers} href="./Overview" id="hallo">
          Neue Agenda erstellen
        </IonButton>
        <IonItem>
          <IonInput
            aria-label="Custom input"
            placeholder="Id einfügen"
            class="custom"
          ></IonInput>
        </IonItem>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};
export default Home;