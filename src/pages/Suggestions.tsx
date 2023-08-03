import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonList,
  IonLabel,
  IonRow,
  IonIcon
} from "@ionic/react";

import BackgroundAll from "../components/BackgroundAll";
import ExploreContainer from "../components/ExploreContainer";
import "./Suggestions.css";
import "./Editing";
import "./Home";
import { arrowBackOutline, homeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Suggestions: React.FC = () => {
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"', "");
  const [comments, setComments] = useState<any[]>([]);
  const [timeslots, setTimeslots] = useState<any[]>([]);
  const history = useHistory();
  const ipAdress = localStorage.getItem("ipAdress")?.replaceAll('"','');

  // Beim Laden der Komponente die Timeslots für das Meeting abrufen
  useEffect(() => {
    fetchComments();
    fetchTimeslots();
  }, []);

  const fetchComments = () => {
    fetch(`http://${ipAdress}:3000/meetings/${adminLink}/comments`)
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
    fetch(`http://${ipAdress}:3000/meetings/${adminLink}/timeslots`)
      .then((response) => response.json())
      .then((data) => {
        setTimeslots(data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Timeslots:", error);
      });
  };

  const handleItemClick = (comment: string) => {
    history.push(`/SuggestionsDetail?comment=${comment}`);
  }
  
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
          <h2 id="sugTopic">Vorschläge</h2>
        </div>
        {comments.length === 0 ? (
          <IonList>
            <IonItem>
              <IonLabel>Es wurden keine Kommentare abgegeben.</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <IonList>
            {comments.map((comment) => (
              <IonItem key={comment.comment_id} onClick={() => handleItemClick(comment.comment_id)} id="sugClick"  >
                <IonLabel>Vorschlag zu: {timeslots.filter(timeslot => timeslot.timeslot_id == (comment.timeslot_id)).map(filteredTimeslot => filteredTimeslot.topic)}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Suggestions;
