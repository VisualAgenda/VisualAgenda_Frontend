import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonLabel,
  IonCol,
  IonRow,
} from "@ionic/react";
import "./Parti_Start.css";
import "./Overview.css";
import "./Parti_Suggestion";
import ExploreContainer from "../components/ExploreContainer";
import BackgroundAll from "../components/BackgroundAll";

const Parti_Start: React.FC = () => {
  const userLink = localStorage.getItem("userLink")?.replaceAll('"', "");
  const [timeslots, setTimeslots] = useState<any[]>([]);
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingDate, setMeetingDate] = useState<string>("");
  const [meetingTime, setMeetingTime] = useState<string>("");
  const ipAdress = localStorage.getItem("ipAdress")?.replaceAll('"','');

  // Beim Laden der Komponente die Timeslots für das Meeting abrufen
  useEffect(() => {
    fetchTimeslots();
    fetchMeetingData();
  }, []);

  const fetchTimeslots = () => {
    fetch(`http://${ipAdress}:3000/meetings/${userLink}/timeslots`)
      .then((response) => response.json())
      .then((data) => {
        setTimeslots(data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Timeslots:", error);
      });
  };

  const fetchMeetingData = () => {
    fetch(`http://${ipAdress}:3000/meetings/${userLink}`)
      .then((response) => response.json())
      .then((data) => {
        setMeetingTitle(data.meeting.name);
        // Annahme: Das Datum wird als String im Format "YYYY-MM-DD" gespeichert
        const date = new Date(data.meeting.start_date);
        // Das Datum im Format "DD.MM.YYYY" anzeigen
        const formattedDate = `${date.getDate()}.${
          date.getMonth() + 1
        }.${date.getFullYear()}`;
        setMeetingDate(formattedDate);

        // Annahme: Die Uhrzeit wird als String im Format "HH:mm:ss" gespeichert
        const time = data.meeting.start_date.split("T")[1];
        // Die Uhrzeit im Format "HH:mm" anzeigen
        const formattedTime = time.substring(0, 5);
        setMeetingTime(formattedTime);
      })
      .catch((error) => {
        console.error(
          "Fehler beim Abrufen der Meeting-Daten aus der Datenbank:",
          error
        );
      });
  };

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <BackgroundAll />
        <IonLabel>
          {/* Meeting-Titel und Datum anzeigen */}
          <h2 id="partiTitel">{meetingTitle}</h2>
          <IonRow>
            <IonCol>
              <p id="partiDate">{meetingDate}</p>
            </IonCol>
            <IonCol>
              <p>{meetingTime} Uhr</p>
            </IonCol>
          </IonRow>
        </IonLabel>

        {timeslots.map((timeslot) => (
          <IonRow key={timeslot.timeslot_id}>
            <IonCol size="9">
              <h6>{timeslot.topic}</h6>
            </IonCol>
            <IonCol>
              <h6>{timeslot.time}:00 Min</h6>{" "}
              {/* Anzeige der Zeit in Minuten */}
            </IonCol>
          </IonRow>
        ))}

        <IonRow>
          <IonCol size="9">
            <h6>Zeit insgesamt:</h6>
          </IonCol>
          <IonCol>
            <h6>
              {timeslots.reduce(
                (totalTime, timeslot) => totalTime + timeslot.time,
                0
              )}
              :00 Min{/* Gesamtzeit berechnen */}
            </h6>
          </IonCol>
        </IonRow>

        <IonButton href="./Parti_Suggestion" expand="block" shape="round" size="large" id="oben">
          Vorschlag erstellen
        </IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};
export default Parti_Start;
