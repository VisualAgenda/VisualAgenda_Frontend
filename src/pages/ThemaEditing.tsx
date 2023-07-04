import React, {} from "react";
import { IonContent, IonPage, IonButton, IonInput, IonItem } from "@ionic/react";

import ExploreContainer from "../components/ExploreContainer";
import "./Overview.css";
import "./Editing";
import "./Home";


const ThemaEditing: React.FC = () => {

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <h2>Thema Bearbeiten</h2>
        <IonItem>
          <IonInput placeholder="Thema"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput placeholder="Vortragender"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput placeholder="Unterthemen"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput placeholder="Links"></IonInput>
        </IonItem>
        <IonButton href="/Editing" shape="round" expand="block" size="large">
          Speichern
        </IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default ThemaEditing;
