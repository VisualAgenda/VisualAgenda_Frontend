import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import "./Overview.css";
import "./Editing";
import "./Home";
import TimeBar from "../components/TimeBar";
import ExploreContainer from "../components/ExploreContainer";

// TODO getAllTimeslots daten speichern in tuple anzeigen lassen. OnClick anzeigen lassen.
// TODO durchiterieren und die id sich holen mit bspw. timeslot : Timeslots
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

const MeetingStart: React.FC = () => {
  return (
    <IonPage>
      <IonContent class="ion-padding">
        <h2>Meeting</h2>
        <TimeBar />
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default MeetingStart;
