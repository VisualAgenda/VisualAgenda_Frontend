import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonLabel,
  IonCol,
  IonRow,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonList,
} from "@ionic/react";
import "./Home.css";
import "./Parti_Suggestions.css";
import "./Overview";
import Background from "../components/Background";
import ExploreContainer from "../components/ExploreContainer";

const Parti_Start: React.FC = () => {
  return (
    <IonPage>
      <IonContent class="ion-padding">
        <IonLabel>
          <h2>Meeting A</h2>
          <IonRow>
            <IonCol size="4">
              <p>04.08.2023</p>
            </IonCol>
            <IonCol>
              <p>13:30</p>
            </IonCol>
          </IonRow>
          <IonList>
              <IonSelect placeholder="Vorschlag zu:">
                <IonSelectOption value="Allgemein">Allgemein</IonSelectOption>
                <IonSelectOption value="Thema A">Thema A</IonSelectOption>
                <IonSelectOption value="Thema B">Thema B</IonSelectOption>
              </IonSelect>
          </IonList>
        </IonLabel>
        <div id="textbox">
          <IonTextarea 
            label="Vorschlag"
            labelPlacement="floating"
            placeholder="Text eingeben"
            rows={15}
          ></IonTextarea>
          </div>
        <IonButton id="hallo">Senden</IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};
export default Parti_Start;