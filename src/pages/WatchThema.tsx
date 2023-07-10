import {
    IonContent,
    IonButton,
    IonPage,
    IonIcon,
    IonRow,
    IonCol,
    IonAlert,
  } from "@ionic/react";
  import React, { useState, useEffect } from "react";
  import ExploreContainer from "../components/ExploreContainer";
  import { homeOutline, settingsOutline } from "ionicons/icons";
  // import Background from "../components/Background";
  import "./Watch.css";
  
  const CountdownTimer = () => {
    const [countdown, setCountdown] = useState(60000);
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
  
      if (isRunning) {
        interval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 10);
        }, 10);
      }
  
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [isRunning]);
    const [handlerMessage, setHandlerMessage] = useState("");
    const [roleMessage, setRoleMessage] = useState("");
    const startTimer = () => {
      setIsRunning(true);
    };
  
    const stopTimer = () => {
      setIsRunning(false);
    };
  
    const getCircleStrokeDasharray = () => {
      const circumference = 2 * Math.PI * 90;
      const remainingPercentage = (60000 - countdown) / 60000;
      const filledLength = remainingPercentage * circumference;
      const emptyLength = circumference - filledLength;
      return `${filledLength} ${emptyLength}`;
    };
  
    return (
      <IonPage>
        <IonContent class="ion-padding">
          {/* <Background /> */}
          <div className="header">
            <IonRow>
              <IonIcon id="home" icon={homeOutline} size="large"></IonIcon>
              <IonAlert
                header="Meeting beenden!"
                trigger="home"
                buttons={[
                  {
                    text: "Ja",
                    role: "cancel",
                    handler: () => {
                      setHandlerMessage("Alert canceled");
                    },
                  },
                  {
                    text: "Nein",
                    role: "confirm",
                    handler: () => {
                      setHandlerMessage("Alert confirmed");
                    },
                  },
                ]}
                onDidDismiss={({ detail }) =>
                  setRoleMessage(`Dismissed with role: ${detail.role}`)
                }
              ></IonAlert>
              <h2 id="h2">Meeting A</h2>
              <IonIcon
                id="settings"
                icon={settingsOutline}
                size="large"
              ></IonIcon>
            </IonRow>
          </div>
          <div>
            <IonRow>
              <IonCol size="9">
                <p>Moderator</p>
              </IonCol>
              <IonCol>
                <p>01:30:00</p>
              </IonCol>
            </IonRow>
          </div>
          <div className="watch">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="20"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#0dd148"
                strokeWidth="20"
                strokeDasharray={getCircleStrokeDasharray()}
                strokeDashoffset="0"
                transform="rotate(-90 100 100)"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="36"
              >
                {Math.trunc(countdown / 1000)}
              </text>
            </svg>
          </div>
          <div id="text2">
            <h5 id="h5">Übersicht</h5>
            <li id="li">Einführung</li>
            <li id="li">Thema A</li>
            <li id="li">Thema B</li>
            <li id="li">Schluss</li>
          </div>
          <div>
            <IonButton onClick={startTimer} disabled={isRunning}>
              Start Timer
            </IonButton>
            <IonButton onClick={stopTimer} disabled={!isRunning}>
              Stop Timer
            </IonButton>
            <ExploreContainer />
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default CountdownTimer;