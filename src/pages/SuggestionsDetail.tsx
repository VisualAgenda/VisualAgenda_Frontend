import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonItem,
  IonRow,
  IonList,
  IonLabel,
  IonButton,
  IonText,
} from "@ionic/react";

import ExploreContainer from "../components/ExploreContainer";
import "./SuggestionsDetail.css";
import "./Editing";
import "./Home";
import { useHistory } from "react-router-dom";
import { arrowBackOutline, homeOutline } from "ionicons/icons";
import BackgroundAll from "../components/BackgroundAll";

const Suggestions: React.FC = () => {
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"', "");
  const [comments, setComments] = useState<any[]>([]);
  const [timeslots, setTimeslots] = useState<any[]>([]);
  const urlParams = new URLSearchParams(location.search);
  const commentParam = JSON.stringify(urlParams.get("comment"))?.replaceAll(
    '"',
    ""
  );
  const timeslot_id = comments
    .filter((comment) => comment.comment_id == commentParam)
    .map((filteredComment) => filteredComment.timeslot_id);
  const topic = timeslots
    .filter((timeslot) => timeslot.timeslot_id == timeslot_id)
    .map((filteredTimeslot) => filteredTimeslot.topic);
  const comment = comments
    .filter((comment) => comment.comment_id == commentParam)
    .map((filteredComment) => filteredComment.comment);
  const history = useHistory();

  // Beim Laden der Komponente die Timeslots für das Meeting abrufen
  useEffect(() => {
    fetchComments();
    fetchTimeslots();
  }, []);

  const fetchComments = () => {
    fetch(`http://localhost:3000/meetings/${adminLink}/comments`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Kommentare:", data);
        setComments(data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Kommentare:", error);
      });
  };

  const fetchTimeslots = () => {
    fetch(`http://localhost:3000/meetings/${adminLink}/timeslots`)
      .then((response) => response.json())
      .then((data) => {
        setTimeslots(data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Timeslots:", error);
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
            <IonIcon
              id="home"
              icon={homeOutline}
              onClick={() => history.push("/home")}
            ></IonIcon>
          </IonRow>
          <h3 id="sugDeTitel" onClick={() => history.push("/MeetingEditing")}>
            Vorschlag zu {topic}
          </h3>
        </div>
        <div id="adminTextbox">
          <IonItem id="noLine">
                <p>{comment}</p>
          </IonItem>
          </div>
        <IonButton expand="block" shape="round" size="large" id="oben" href="/Editing">
          Meeting bearbeiten
        </IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Suggestions;
