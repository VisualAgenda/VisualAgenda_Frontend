import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonItem,
  IonDatetime,
  IonIcon,
  IonRow
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Overview.css";
import "./Editing";
import "./Home";
import { useHistory } from "react-router-dom";
import { arrowBackOutline, homeOutline } from "ionicons/icons";


const MeetingEditing: React.FC = () => {
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"', "");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const ipAdress = localStorage.getItem("ipAdress")?.replaceAll('"','');
  
  useEffect(() => {
    // HTTP GET-Anfrage an den Server, um die Meeting-Daten aus der Datenbank abzurufen
    fetchMeetingData();
  }, [adminLink]);

  const fetchMeetingData = () => {
    fetch(`http://${ipAdress}:3000/meetings/${adminLink}`)
      .then((response) => response.json())
      .then((data) => {
        // Hier die empfangenen Daten setzen
        setMeetingTitle(data.meeting.name);
        setMeetingDate(data.meeting.start_date);
        // Weitere Meeting-Eigenschaften setzen
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Meeting-Daten aus der Datenbank:", error)
      );
  };

  const saveMeetingData = () => {
    // HTTP PUT-Anfrage an den Server, um die Meeting-Daten in der Datenbank zu aktualisieren
    fetch(`http://${ipAdress}:3000/meetings/${adminLink}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: meetingTitle,
        startDate: meetingDate + ".000z",
        
        // Weitere Meeting-Eigenschaften können hier hinzugefügt werden
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Meeting-Daten erfolgreich gespeichert:", data);
        // Hier kannst du die Antwort verarbeiten, wenn nötig
        // Zum Beispiel: Anzeige einer Erfolgsmeldung, Zurücksetzen der Eingabefelder, etc.
      })
      .catch((error) =>
        console.error("Fehler beim Speichern der Meeting-Daten:", error)
      );
      setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 5000);
  };

  const handleDateChange = (event: CustomEvent) => {
    const newDate = event.detail.value;
    setMeetingDate(newDate);
  };

  return (
    <IonPage>
      <IonContent class="ion-padding">
      <div className="header">
          <IonRow>
          <IonIcon
              id="back"
              icon={arrowBackOutline}
              onClick={() => history.goBack()}
            ></IonIcon>
            <IonIcon id="home" icon={homeOutline} onClick={() => history.push("/Overview")}></IonIcon>
          </IonRow>
          <h2>Meeting bearbeiten</h2>
        </div>
       
        <IonItem>
          <IonInput
            label="Titel:"
            value={meetingTitle}
            onIonChange={(e) => setMeetingTitle(e.detail.value!)}
          ></IonInput>
        </IonItem>
        {meetingDate !== null && meetingDate.length!=0 && (
          <IonItem>
            <IonDatetime
              value={meetingDate}
              onIonChange={handleDateChange}
            ></IonDatetime>
          </IonItem>
        )}
        {/* Weitere Input-Felder für Meeting-Eigenschaften können hier hinzugefügt werden */}
        <IonButton
          shape="round"
          expand="block"
          size="large"
          id="oben"
          onClick={saveMeetingData}
        >
          Speichern
        </IonButton>
        {isSaved && (
          <div>
            <p>Meetingdaten wurden erfolgreich gespeichert!</p>
          </div>
        )}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default MeetingEditing;

