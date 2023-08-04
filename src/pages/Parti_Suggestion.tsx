import React, { useState, useEffect } from "react";
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
  IonIcon
} from "@ionic/react";
import "./Home.css";
import "./Parti_Suggestions.css";
import "./Overview";
import BackgroundAll from "../components/BackgroundAll";
import ExploreContainer from "../components/ExploreContainer";
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Parti_Suggestion: React.FC = () => {
  const [timeslots, setTimeslots] = useState<any[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("Allgemein");
  const [suggestionText, setSuggestionText] = useState<string>("");
  const userLink = localStorage.getItem("userLink")?.replaceAll('"', "");
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const [meetingDate, setMeetingDate] = useState<string>("");
  const [meetingTime, setMeetingTime] = useState<string>("");
  const ipAdress = localStorage.getItem("ipAdress")?.replaceAll('"','');
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);

  // Beim Laden der Komponente die Timeslots für das Meeting abrufen
  useEffect(() => {
    fetchTimeslots();
    fetchMeetingData();
  }, []);

  const fetchTimeslots = () => {
    fetch(`http://${ipAdress}:3000/meetings/${userLink}/timeslots`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Timeslot-Daten:", data);
        setTimeslots(data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Timeslots:", error);
      });
  };

  const handleSelectChange = (event: CustomEvent) => {
    setSelectedTopic(event.detail.value);
  };

  const handleSuggestionChange = (event: CustomEvent) => {
    setSuggestionText(event.detail.value);
    console.log (event.detail.value);
  };

  const getTimeslotId = (name: String) => {
    for ( var i=0;i<timeslots.length;i++){
      if(timeslots[i].topic == name){
        return timeslots[i].timeslot_id;
      }
    }
  }

  const handleSubmit = () => {
    if (!selectedTopic || !suggestionText) {
      // Stellen Sie sicher, dass sowohl ein Thema als auch ein Kommentartext ausgewählt wurden
      return;}
    // HTTP POST-Anfrage an den Server, um den Vorschlag zu speichern
    const timeslotId = getTimeslotId(selectedTopic);
    fetch(`http://${ipAdress}:3000/meetings/${userLink}/timeslots/${timeslotId}/comments`, {
     method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: suggestionText }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Kommentar erfolgreich gespeichert");
          // Hier können Sie Benachrichtigungen oder Zustandsaktualisierungen vornehmen, um den Benutzer zu informieren
        } else {
          console.error("Fehler beim Speichern des Kommentars");
        }
      })
      .catch((error) => {
        console.error("Fehler beim Speichern des Kommentars:", error);
      });
      setIsSaved(true); 
    setTimeout(() => {
      setIsSaved(false);
    }, 5000);
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
      <div className="header">
          <IonRow>
          <IonIcon
              id="back"
              icon={arrowBackOutline}
              onClick={() => history.goBack()}
            ></IonIcon>
          </IonRow>
          <IonLabel>
          {/* Meeting-Titel und Datum anzeigen */}
          <h2 id="sugTitel">{meetingTitle}</h2>
          <IonRow>
            <IonCol id="sugDate">
              <p >{meetingDate}</p>
            </IonCol>
            <IonCol>
              <p>{meetingTime} Uhr</p>
            </IonCol>
          </IonRow>
        </IonLabel>
        </div>
        
        <IonLabel>
          <IonList>
            <IonSelect
              id="sugSelect"
              placeholder="Vorschlag zu:"
              value={selectedTopic}
              onIonChange={handleSelectChange}
            >
              {timeslots.map((timeslot) => (
                <IonSelectOption
                  key={timeslot.timeslot_id}
                  value={timeslot.topic}
                >
                  {timeslot.topic}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonList>
        </IonLabel>
        <div id="textbox">
          <IonTextarea
            label="Vorschlag"
            labelPlacement="floating"
            placeholder="Text eingeben"
            rows={15}
            value={suggestionText}
            onIonChange={handleSuggestionChange}
          ></IonTextarea>
        </div>
        <IonButton
          id="oben" expand="block" shape="round" size="large"  onClick={handleSubmit}
        >
          Senden
        </IonButton>
        
        {isSaved && (
          <div>
            <p>Der Kommentar wurde erfolgreich gespeichert!</p>
          </div>
        )}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Parti_Suggestion;
