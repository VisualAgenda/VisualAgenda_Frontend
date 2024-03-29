import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonItem,
  IonTextarea,
  IonRow,
  IonIcon,
  IonCol,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./ThemaEditing.css";
import "./Editing";
import "./Home";
import BackgroundAll from "../components/BackgroundAll";
import { arrowBackOutline, homeOutline } from "ionicons/icons";
import { useLocation, useHistory } from "react-router-dom";

const ThemaEditing: React.FC = () => {
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"', "");

  const location = useLocation();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [presenter, setPresenter] = useState("");
  const [time, setTime] = useState("");
  const urlParams = new URLSearchParams(location.search);
  const themaParam = JSON.stringify(urlParams.get("Thema"))?.replaceAll(
    '"',
    ""
  );
  const timeslot_id = localStorage.getItem(adminLink + themaParam);
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const ipAdress = localStorage.getItem("ipAdress")?.replaceAll('"','');


  useEffect(() => {
    // HTTP GET-Anfrage an den Server, um den Timeslot aus der Datenbank abzurufen
    fetch(
      `http://${ipAdress}:3000/meetings/${adminLink}/timeslots/${timeslot_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTopic(data.topic);
        setDescription(data.description);
        setPresenter(data.presenter);
        setTime(data.time.toString());
      })
      .catch((error) =>
        console.error(
          "Fehler beim Abrufen des Timeslots aus der Datenbank:",
          error
        )
      );
  }, [adminLink, timeslot_id]);

  const saveTimeslot = () => {
    // HTTP POST-Anfrage an den Server, um den Timeslot zu erstellen
    fetch(
      `http://${ipAdress}:3000/meetings/${adminLink}/timeslots/${timeslot_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
          presenter: presenter,
          description: description,
          time: parseInt(time),
          // Weitere Eigenschaften des Timeslots können hier hinzugefügt werden
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Timeslot erfolgreich gespeichert:", data);
        localStorage.setItem(
          adminLink + topic,
          JSON.stringify(timeslot_id)?.replaceAll('"', "")
        );
        // localStorage.removeItem(themaParam);
      })
      .catch((error) =>
        console.error("Fehler beim Speichern des Timeslots:", error)
      );
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 5000);
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
            <IonIcon
              id="home"
              icon={homeOutline}
              onClick={() => history.push("/Overview")}
            ></IonIcon>
          </IonRow>
          <h2 id="thTopic">Thema</h2>
          <h2 id="be">bearbeiten</h2>
        </div>
        <IonItem>
          <IonInput
            label="Thema:"
            value={topic}
            onIonChange={(e) => setTopic(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            label="Vortragender:"
            value={presenter}
            onIonChange={(e) => setPresenter(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonTextarea
            id="unterthemen"
            label="Unterthemen:"
            labelPlacement="floating"
            placeholder="Text eingeben"
            rows={5}
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          ></IonTextarea>
        </IonItem>
        <IonItem>
          <IonInput
            label="Länge in Minuten: "
            value={time}
            onIonChange={(e) => setTime(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton
          shape="round"
          expand="block"
          size="large"
          id="oben"
          onClick={saveTimeslot}
        >
          Speichern
        </IonButton>
        {isSaved && (
          <div>
            <p>Die Timeslotdaten wurden erfolgreich gespeichert!</p>
          </div>
        )}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default ThemaEditing;
