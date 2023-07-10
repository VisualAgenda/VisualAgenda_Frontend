import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonLabel,
  IonCol,
  IonRow,
} from "@ionic/react";
import "./Home.css";
import "./Parti_Suggestion";
import Background from "../components/Background";
import ExploreContainer from "../components/ExploreContainer";
// TODO Getalltimeslots, abspeichern anzeigen.

//  TODO das muss beim navigieren auf diese seite ausgefuehrt werden und meetingID muss halt mit uebergeben werden immer. 
/*

      fetch(`http://localhost:3000/meetings/${meetingId}/timeslots`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Timeslot-Daten:", data);
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen des Meetings:", error);
            });
    };
*/


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
        </IonLabel>
        <IonRow>
          <IonCol size="9">
            <h6>Thema A</h6>
          </IonCol>
          <IonCol>
            <h6>00:14:00</h6>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="9">
            <h6>Thema B</h6>
          </IonCol>
          <IonCol>
            <h6>00:14:00</h6>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="9">
            <h6>Thema C</h6>
          </IonCol>
          <IonCol>
            <h6>00:14:00</h6>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="9">
            <h6>Thema D</h6>
          </IonCol>
          <IonCol>
            <h6>00:14:00</h6>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="9">
            <h6>Thema F</h6>
          </IonCol>
          <IonCol>
            <h6>00:14:00</h6>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="9">
            <h6>Zeit insgesamt:</h6>
          </IonCol>
          <IonCol>
            <h6>01:00:00</h6>
          </IonCol>
        </IonRow>
        <IonButton href="./Parti_Suggestion" id="hallo">
          Vorschlag erstellen
        </IonButton>
        <IonLabel>
            <p>Vorschlag abzugeben bis 03.06.2023</p>
        </IonLabel>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};
export default Parti_Start;