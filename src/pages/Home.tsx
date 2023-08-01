import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  InputChangeEventDetail,
  useIonRouter,
  IonIcon, IonRow, IonCol
} from "@ionic/react";
import Background from "../components/Background";
import ExploreContainer from "../components/ExploreContainer";
import { arrowForwardCircleOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const [meetingName, setMeetingName] = useState(""); // Zustand für den Namen des Meetings
  const ionRouter = useIonRouter();

  const handleInputChange = (e: CustomEvent<InputChangeEventDetail>) => {
    setMeetingName(e.detail.value!); // Aktualisiere den Zustand mit dem eingegebenen Namen
  };

  const handleGetMeeting = async () => {
    try {
      const response = await fetch(`http://localhost:3000/meetings/${meetingName}`);
      const responseData = await response.json();

      if (response.ok) {
        if (responseData.meeting !== null && typeof responseData.meeting === "object") {
        // Meeting wurde gefunden, überprüfe den Admin-Link
        const isAdmin = responseData.isAdmin;

        // Speichere die Links im Local Storage zur späteren Verwendung
        localStorage.setItem("adminLink", JSON.stringify(responseData.meeting.admin_link));
        localStorage.setItem("userLink", JSON.stringify(responseData.meeting.user_link));

        if (isAdmin) {
          // Admin-Link, leite zu Overview.tsx weiter
          ionRouter.push("/overview");
        } else {
          // User-Link, leite zu Suggestions.tsx weiter
          ionRouter.push("/parti_start");
        }
      }
      } else {
        // Fehler beim Abrufen des Meetings oder Link nicht gefunden
        console.error("Fehler beim Abrufen des Meetings:", responseData.error);
        // Hier kannst du eine Fehlermeldung anzeigen, falls der Link nicht gefunden wurde.
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Meetings:", error);
      // Hier kannst du eine Fehlermeldung anzeigen, falls die API-Anfrage fehlschlägt.
    }
  };

  // Funktion zum Erstellen eines Meetings
  const createMeeting = async () => {
    try {
      // Führe einen API-Aufruf zum Server aus, um das Meeting zu erstellen
      const response = await fetch("http://localhost:3000/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: meetingName,
          start_date: new Date().toISOString(), // Übergib hier den Startzeitpunkt des Meetings, den du verwenden möchtest
        }),
      });

      if (!response.ok) {
        // Wenn die Serverantwort einen Fehlerstatus zurückgibt, wirf einen Fehler
        throw new Error("Fehler beim Erstellen des Meetings");
      }

      const responseData = await response.json();
      // Erfolgreiche Antwort vom Server
      console.log("Meeting erfolgreich erstellt:", responseData);
      localStorage.setItem("adminLink", JSON.stringify(responseData.meeting.admin_link));
      localStorage.setItem("userLink", JSON.stringify(responseData.meeting.user_link));
      // Hier kannst du nach der Erstellung die Weiterleitung zu einer anderen Seite implementieren oder eine Erfolgsmeldung anzeigen.
      // Navigiere zur Übersichtsseite (oder zu einer anderen gewünschten Seite)
      ionRouter.push("/overview");
    } catch (error) {
      // Fehler beim Erstellen des Meetings
      console.error("Fehler beim Erstellen des Meetings:", error);
      // Hier kannst du eine Fehlermeldung anzeigen, falls die Erstellung fehlschlägt.
    }
  };

  // Funktion zum Verarbeiten von Eingaben im Textfeld
  
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <Background />
        <h1>
          Visual <br /> Agenda
        </h1>
        <IonButton id="hallo" onClick={createMeeting}>
          Neue Agenda erstellen
        </IonButton>

        <IonItem>
          <IonRow>
            <IonCol size="10">
          <IonInput
            aria-label="Custom input"
            placeholder="Id einfügen"
            className="custom"
            value={meetingName}
            onIonChange={handleInputChange}
          ></IonInput>
          </IonCol>
          <IonCol>
        <IonIcon id="ic" icon={ arrowForwardCircleOutline } onClick={handleGetMeeting}></IonIcon>
        </IonCol>
          </IonRow>
        </IonItem>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
