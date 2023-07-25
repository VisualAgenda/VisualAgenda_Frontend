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

//TODO getAlltimeslots, Formular als objekt abspeichern und senden zu createComment.
/* TODO Step 1: alle timeslots holen und im dropdown menu anzeigen
        Step 2: TimeslotID nutzen fuer createComment

/*  TODO das muss beim navigieren auf diese seite ausgefuehrt werden und meetingID muss halt mit uebergeben werden immer. 

      fetch(`http://localhost:3000/meetings/${meetingId}/timeslots`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Timeslot-Daten:", data);
            })
            .catch((error) => {
                console.error("Fehler beim Abrufen des Meetings:", error);
            });
    };


      const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Senden Sie den POST-Request an die API
    fetch("http://localhost:3000/meetings/${meetingId}/timeslots/${timeslotId}/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // TODO das ist der ort zum daten mitteilen am besten gibst du von hause aus einen namen und eine zeit mit. Guck dir die datenstruktur nochmal an und besprich mit mir wie es geaendert werden muss.
    })
      .then((response) => response.json())
      .then((data) => {
        // Verarbeiten Sie die Antwort der API
        console.log(data);
      })
      .catch((error) => {
        console.error("Fehler beim Senden des POST-Requests:", error);
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
