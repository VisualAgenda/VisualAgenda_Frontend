import React, { useState } from "react";
import {
    IonButton,
    IonContent,
    IonPage,
    IonInput,
    IonItem, InputChangeEventDetail,
} from "@ionic/react";
import "./Home.css";
import "./Overview";
import Background from "../components/Background";
import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
    const [meetingId, setMeetingId] = useState<string>("");

    const handleInputChange = (event: CustomEvent<InputChangeEventDetail>) => {
        const inputValue = (event.target as HTMLInputElement).value;
        setMeetingId(inputValue);
    };

    const handleGetMeeting = () => {
        fetch(`http://localhost:3000/meetings/${meetingId}`)
            .then((response) => response.json())
            .then((data) => {
                // Datenverarbeitung und Weiterleitung zur Overview-Komponente oder Parti_Start-Komponente
                console.log("Meeting-Daten:", data);
                localStorage.setItem("meetingData", JSON.stringify(data)); // speichert wie unten es


                if(data.isAdmin){
                window.location.href = "./Overview";

                }
                if(!data.isAdmin && meetingId != ""){
                  window.location.href = "./parti_start";

                }

            })
            .catch((error) => {
                console.error("Fehler beim Abrufen des Meetings:", error);
            });
    };



    /*const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      // Senden Sie den POST-Request an die API
      fetch("http://localhost:3000/meetings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // TODO das ist der ort zum daten mitteilen am besten gibst du von hause aus ein Topic  und ein datum mit. Guck dir die datenstruktur nochmal an und besprich mit mir wie es geaendert werden muss.
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



    const generateRandomNumbers = () => {
        const number1 = Math.floor(Math.random() * 10000000000);
        const number2 = Math.floor(Math.random() * 10000000000000);
        // Speichern Sie die generierten Zahlen in localStorage
        localStorage.setItem("randomNumbers", JSON.stringify({ number1, number2 }));
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <Background />
                <h1>
                    Visual <br /> Agenda
                </h1>
                <IonButton onClick={generateRandomNumbers} href="./Overview" id="hallo">
                    Neue Agenda erstellen
                </IonButton>
                <IonItem>
                    <IonInput
                        aria-label="Custom input"
                        placeholder="Id einfügen"
                        className="custom"
                        value={meetingId}
                        onIonChange={handleInputChange}
                    ></IonInput>
                </IonItem>
                <IonButton onClick={handleGetMeeting} className="custom" expand="full">
                    Meeting abrufen
                </IonButton>
                <ExploreContainer />
            </IonContent>
        </IonPage>
    );
};

export default Home;
