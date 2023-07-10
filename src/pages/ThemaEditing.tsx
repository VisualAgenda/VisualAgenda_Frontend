import React from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonItem,
} from "@ionic/react";

import ExploreContainer from "../components/ExploreContainer";
import "./Overview.css";
import "./Editing";
import "./Home";

// TODO gettimeslot with id ? dann sollen die objekte angezeigt werden als placeholder und wenn keiner da einfach standard
/* TODO
    Step 1 Timeslot holen
    Step 2 Wenn auf speichern gedrueckt wird muss ein PUT auf die Timeslots und deren ID gemacht werden

    //TODO get timeslot by ID, abspeichern und beschreibung anzeigen dafuer muss die meetingid und die timeslot id mitgegeben werden muss direkt am start gemacht werden

const handleGetTimeslot = () => {
  fetch(`http://localhost:3000/meetings/${meetingId}/timeslots/${timeslotId}`)
    .then((response) => response.json())
    .then((data) => {
      // Datenverarbeitung und Weiterleitung zur Overview-Komponente oder Parti_Start-Komponente
      console.log("Time-Slot:", data);
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen des Meetings:", error);
    });
};


    /*const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      Senden Sie den POST-Request an die API
      fetch("http://localhost:3000/meetings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // TODO das ist der ort zum daten mitteilen am besten gibst du von hause aus ein Topic  und ein datum mit. Guck dir die datenstruktur nochmal an und besprich mit mir wie es geaendert werden muss.
      })
        .then((response) => response.json())
        .then((data) => {
           Verarbeiten Sie die Antwort der API
          console.log(data);
        })
        .catch((error) => {
          console.error("Fehler beim Senden des POST-Requests:", error);
        });
    };


    
*/
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
