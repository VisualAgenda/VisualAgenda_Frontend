// import React, { useState } from "react";
// import {
//   IonButton,
//   IonContent,
//   IonPage,
//   IonInput,
//   IonItem,
//   InputChangeEventDetail,
//   useIonRouter,
// } from "@ionic/react";
// import Background from "../components/Background";
// import ExploreContainer from "../components/ExploreContainer";
// import { useHistory } from "react-router-dom";

// const Home: React.FC = () => {
//   const [meetingName, setMeetingName] = useState(""); // Zustand für den Namen des Meetings
//   const ionRouter = useIonRouter();
//   // Funktion zum Erstellen eines Meetings
//   const createMeeting = async () => {
//     try {
//       // Führe einen API-Aufruf zum Server aus, um das Meeting zu erstellen
//       const response = await fetch("http://localhost:3000/meetings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: meetingName,
//           start_date: new Date().toISOString(), // Übergib hier den Startzeitpunkt des Meetings, den du verwenden möchtest
//         }),
//       });

//       if (!response.ok) {
//         // Wenn die Serverantwort einen Fehlerstatus zurückgibt, wirf einen Fehler
//         throw new Error("Fehler beim Erstellen des Meetings");
//       }

//       const responseData = await response.json();
//       // Erfolgreiche Antwort vom Server
//       console.log("Meeting erfolgreich erstellt:", responseData);
//       // Hier kannst du nach der Erstellung die Weiterleitung zu einer anderen Seite implementieren oder eine Erfolgsmeldung anzeigen.
//       // Navigiere zur Übersichtsseite (oder zu einer anderen gewünschten Seite)
//       ionRouter.push("/overview");
//     } catch (error) {
//       // Fehler beim Erstellen des Meetings
//       console.error("Fehler beim Erstellen des Meetings:", error);
//       // Hier kannst du eine Fehlermeldung anzeigen, falls die Erstellung fehlschlägt.
//     }
//   };

//   // Funktion zum Verarbeiten von Eingaben im Textfeld
//   const handleInputChange = (e: CustomEvent<InputChangeEventDetail>) => {
//     setMeetingName(e.detail.value!); // Aktualisiere den Zustand mit dem eingegebenen Namen
//   };

//   return (
//     <IonPage>
//       <IonContent className="ion-padding">
//         <Background />
//         <h1>
//           Visual <br /> Agenda
//         </h1>
//         <IonItem>
//           <IonInput
//             aria-label="Custom input"
//             placeholder="Name des Meetings"
//             className="custom"
//             value={meetingName}
//             onIonChange={handleInputChange}
//           ></IonInput>
//         </IonItem>
//         <IonButton
//           onClick={createMeeting}
//           className="custom"
//           expand="full"
//         id="hallo"
//         >
//           Neue Agenda erstellen
//         </IonButton>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Home;

import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonInput,
  IonItem,
  InputChangeEventDetail,
  useIonRouter,
} from "@ionic/react";
import Background from "../components/Background";
import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
  const [meetingName, setMeetingName] = useState(""); // Zustand für den Namen des Meetings
  const ionRouter = useIonRouter();
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
  const handleInputChange = (e: CustomEvent<InputChangeEventDetail>) => {
    setMeetingName(e.detail.value!); // Aktualisiere den Zustand mit dem eingegebenen Namen
  };
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
          <IonInput
            aria-label="Custom input"
            placeholder="Id einfügen"
            className="custom"
            // value={meetingId}
            // onIonChange={handleInputChange}
          ></IonInput>
        </IonItem>
        <IonButton
          // onClick={handleGetMeeting}
          className="custom"
          expand="full"
        >
          Meeting abrufen
        </IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
