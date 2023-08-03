import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonIcon,
  IonRow,
  IonCol,
  IonPage,
} from "@ionic/react";
import "./ThemaEditing";
import { add } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Editing.css";
import ExploreContainer from "../components/ExploreContainer";
import { trash, arrowBackOutline, homeOutline } from "ionicons/icons";
import BackgroundAll from "../components/BackgroundAll";

const Editing: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [fetchItems, setfetchItems] = useState<string[]>([]);
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"', "");
  const [timeslotIds, setTimeslotIds] = useState<number[]>([]);
  const [timeslotTime, setTimeslotTime] = useState<number[]>([]);
  const [meetingTitle, setMeetingTitle] = useState("");
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const addItem = () => {
    const newItem = `Thema ${items.length + 1}`;
    setItems([...items, newItem]);
    setfetchItems([...fetchItems, newItem]);
  };

  useEffect(() => {
    // Beim Laden der Komponente Timeslots vom Server abrufen
    fetchTimeslots();
    fetchMeetingData();
  }, []);

  const fetchTimeslots = () => {
    // HTTP GET-Anfrage an den Server, um die Timeslots abzurufen
    fetch(`http://localhost:3000/meetings/${adminLink}/timeslots`)
      .then((response) => response.json())
      .then((data) => {
        // Timeslots in der lokalen State-Variable speichern
        setItems(data.map((timeslot: any) => timeslot.topic));
        setTimeslotIds(data.map((timeslot: any) => timeslot.timeslot_id));
        setTimeslotTime(data.map((timeslot: any) => timeslot.time));
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Timeslots:", error)
      );
  };

  const fetchMeetingData = () => {
    // HTTP GET-Anfrage an den Server, um die Meeting-Daten abzurufen
    fetch(`http://localhost:3000/meetings/${adminLink}`)
      .then((response) => response.json())
      .then((data) => {
        // Hier den Meeting-Titel setzen
        setMeetingTitle(data.meeting.name);
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Meeting-Daten aus der Datenbank:", error)
      );
  };

  const saveTimeslots = () => {
    // Iteriere durch jeden Timeslot und sende ihn einzeln an den Server
    fetchItems.forEach((timeslot) => {
      // HTTP POST-Anfrage an den Server, um den Timeslot zu erstellen
      fetch(`http://localhost:3000/meetings/${adminLink}/timeslots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: timeslot,
          description: "",
          presenter: "",
          time: 5,
          link: adminLink,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Timeslot erfolgreich gespeichert:", data);
          // Hier kannst du die Antwort verarbeiten, wenn nötig
          // Zum Beispiel: Anzeige einer Erfolgsmeldung
          timeslot = timeslot.replaceAll(" ", "");
          localStorage.setItem(
            adminLink + timeslot,
            JSON.stringify(data.timeslot.timeslot_id)
          );
        })
        .catch((error) =>
          console.error("Fehler beim Speichern des Timeslots:", error)
        );
    });

    // Nach dem Speichern der Timeslots, setze die lokale Liste zurück
    setfetchItems([]);
    setIsSaved(true); 
    setTimeout(() => {
      setIsSaved(false);
    }, 5000);
  };

  const handleItemClick = (timeslot: string) => {
    timeslot = timeslot.replaceAll(" ", "");
    history.push(`/ThemaEditing?Thema=${timeslot}`);
  };

  const handleItemDelete = (index: number) => {
    const timeslotId = timeslotIds[index];
    // HTTP DELETE-Anfrage an den Server, um den Timeslot zu löschen
    fetch(
      `http://localhost:3000/meetings/${adminLink}/timeslots/${timeslotId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Timeslot erfolgreich gelöscht:", data);
        // Hier kannst du die Antwort verarbeiten, wenn nötig
        // Zum Beispiel: Anzeige einer Erfolgsmeldung, Aktualisieren der Timeslots-Liste
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      })
      .catch((error) =>
        console.error("Fehler beim Löschen des Timeslots:", error)
      );
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
            <IonIcon id="home" icon={homeOutline} onClick={() => history.push("/Overview")}></IonIcon>
          </IonRow>
          <h2 id="edTopic" onClick={() => history.push("/MeetingEditing")} >{meetingTitle}</h2>
        </div>
        <IonList>
          {items.map((item, index) => (
            <IonItem key={index}>
              <IonCol size="5">
                <p id="EdTimeSlot" onClick={() => handleItemClick(item)}>{item}</p>
              </IonCol>
              <IonCol>
                <p>{timeslotTime[index] ? timeslotTime[index] : 5}:00</p>
              </IonCol>
              <IonIcon
                id="trash"
                icon={trash}
                slot="end"
                onClick={() => handleItemDelete(index)}
              />
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={addItem} fill="clear" id="edExtra">
          <IonIcon slot="icon-only" icon={add}></IonIcon>
        </IonButton>
        <IonItem id="noLine">
          <IonCol id="ins">
            <p>Zeit insgesamt:</p>
          </IonCol>
          <IonCol>
            <p>{timeslotTime.reduce((acc, t) => acc + t, 0)}:00</p>
          </IonCol>
        </IonItem>
        <IonButton expand="full" onClick={saveTimeslots} id="oben">
          Speichern
        </IonButton>
        {isSaved && (
          <div>
            <p>Die Timeslots wurden erfolgreich gespeichert!</p>
          </div>
        )}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Editing;
