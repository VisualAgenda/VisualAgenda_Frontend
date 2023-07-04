import React, {} from "react";
import { IonContent, IonPage} from "@ionic/react";
import "./Overview.css";
import "./Editing";
import "./Home";
import TimeBar from '../components/TimeBar';
import ExploreContainer from "../components/ExploreContainer";

const MeetingStart: React.FC = () => {

  return (
    <IonPage>
      <IonContent class="ion-padding">
        <h2>Meeting</h2>
        <TimeBar />
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default MeetingStart;