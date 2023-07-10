import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  IonToggle,
} from "@ionic/react";

import ExploreContainer from "../components/ExploreContainer";
import "./Overview.css";
import "./Editing";
import "./Home";

// TODO Get all comments benutzen muss am anfang gemacht werden. 
/*

      fetch(`/meetings/${meetingId}/timeslots/${timeslotId}/comments`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Timeslot-Daten:", data);
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen des Meetings:", error);
            });
    };
*/
const Suggestions: React.FC = () => {
  return (
    <IonPage>
      <IonContent class="ion-padding">
        <h2>Vorschläge</h2>
        <IonItem>
          <IonToggle>Vorschläge zulassen</IonToggle>
          <br />
        </IonItem>
        <IonItem>
          <IonInput label="Vorschlag bis" placeholder="15:30"></IonInput>
        </IonItem>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Suggestions;
