import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonIcon,
} from "@ionic/react";
import { time, timeOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./WatchStart.css";
import {
  pauseCircleOutline,
  playCircleOutline,
  arrowBackOutline,
  homeOutline,
} from "ionicons/icons";

const WatchStart: React.FC = () => {
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"', "");

  const [timeslots, setTimeslots] = useState<any[]>([]);
  const [activeTimeslotIndex, setActiveTimeslotIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [sumTime, setSumTime] = useState<number>(0);
  const [smoothTime, setSmoothTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<any>(null);
  const [timeList, setTimeList] = useState<number[]>([]);
  const history = useHistory();
  const [totalTime, setTotalTime] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const factor = 100;
  const [meetingTitle, setMeetingTitle] = useState("");

  // Beim Laden der Komponente die Timeslots aus der Datenbank abrufen
  useEffect(() => {
    fetchTimeslots();
    fetchMeetingData();
  }, []);

  const fetchTimeslots = () => {
    fetch(`http://localhost:3000/meetings/${adminLink}/timeslots`)
      .then((response) => response.json())
      .then((data) => {
        setTimeslots(data);
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


  const addNumber = (num: number) => {
    setTimeList([...timeList, num]);
  };

  const startTimer = () => {
    if (!timerInterval) {
      // Starte den Timer nur für den aktiven Timeslot
      const activeTimeslot = timeslots[activeTimeslotIndex];
      if (activeTimeslot) {
        setTimerInterval(
          setInterval(() => {
            setCurrentTime((prevTime) => prevTime + 1);
          }, 1000)
        ); // Aktualisiere den Timer alle 1 Sekunde (in Sekunden)
      }
    }
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const calculateProgress = (time: number, passedTime: number): number => {
    // Berechne den Fortschritt basierend auf der vergangenen Zeit in Minuten und der Gesamtdauer des Timeslots in Minuten
    if (time === 0) return 0;
    return Math.min(passedTime / 60 / time, 1);
  };

  const goToNextTimeSlot = () => {
    addNumber(currentTime);
    setActiveTimeslotIndex((prevIndex) => prevIndex + 1);
    setCurrentTime(0); // Setze die aktuelle Zeit zurück
  };

  const calculateRemainingTime = (time: number, passedTime: number): string => {
    if (time * 60 == passedTime) {
      const zero = 0;
      return `${zero.toString().padStart(2, "0")}:${zero
        .toString()
        .padStart(2, "0")}`;
    } else if (time * 60 < passedTime) {
      const overflowInSeconds = passedTime - time * 60;
      const overflowMinutes = Math.floor(overflowInSeconds / 60);
      const overflowSeconds = overflowInSeconds % 60;
      return `+${overflowMinutes.toString().padStart(2, "0")}:${overflowSeconds
        .toString()
        .padStart(2, "0")}`;
    }
    const remainingTimeInSeconds = time * 60 - passedTime;
    const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);
    const remainingSeconds = remainingTimeInSeconds % 60;

    return `${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };


  useEffect(() => {
    const totalTimeslotTime = timeslots.reduce((acc, t) => acc + t.time, 0);
    setTotalTime(totalTimeslotTime);
  }, [timeslots]);

  const progress = calculateProgress(totalTime, sumTime);

  const startTimerOnce = () => {
    if (!timerStarted) {
      startTimer();
      setTimerStarted(true);
      setInterval(() => {
        setSumTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      startTimer();
    }
  };

  const handleItemClick = () => {
    localStorage.setItem(
      "activeTimeslotIndex",
      JSON.stringify(activeTimeslotIndex).replaceAll('"', "")
    );
    localStorage.setItem(
      "currentTime",
      JSON.stringify(currentTime).replaceAll('"', "")
    );
    for (let i = 0; i < timeList.length; i++) {
      let storeKey = "timeList" + timeList[i];
      localStorage.setItem(
        storeKey,
        JSON.stringify(timeList[i]).replaceAll('"', "")
      );
    }
    localStorage.setItem(
      "totalTime",
      JSON.stringify(totalTime).replaceAll('"', "")
    );
    localStorage.setItem(
      "sumTime",
      JSON.stringify(sumTime).replaceAll('"', "")
    );
    history.push(`/Watch`);
  };

  const getCircleStrokeDasharray = () => {
    const circumference = 2 * Math.PI * 90;
    const remainingPercentage = sumTime / (totalTime * 60);
    const filledLength = remainingPercentage * circumference;
    const emptyLength = circumference - filledLength;
    return `${filledLength} ${emptyLength}`;
  };

  return (
    <IonPage>
      <IonContent class="ion-padding">
      <div className="header">
          <IonRow>
          <IonIcon
              id="back"
              icon={arrowBackOutline}
              onClick={() => history.goBack()}
            ></IonIcon>
            <IonIcon id="home" icon={homeOutline} onClick={() => history.push("/home")}></IonIcon>
          </IonRow>
          <h2 id="edTopic" onClick={() => history.push("/MeetingEditing")} >{meetingTitle}</h2>
        </div>
        <div className="watch">
          <svg width="180" height="180" viewBox="0 0 200 200">
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
              {calculateRemainingTime(totalTime, sumTime)}
            </text>
          </svg>
        </div>
        <IonText>
          <h3 id="text1">Übersicht</h3>
        </IonText>
        {timeslots.map((timeslot, index) => (
          <div key={timeslot.timeslot_id}>
            <IonRow id="balkentext">
              <IonCol size="9">
                <p>{timeslot.topic}</p>
              </IonCol>
              <IonCol>
                <p>
                  {" "}
                  {index == activeTimeslotIndex
                    ? calculateRemainingTime(
                        timeslot.time,
                        Math.trunc(Math.abs(currentTime))
                      )
                    : index > activeTimeslotIndex
                    ? calculateRemainingTime(timeslot.time, 0)
                    : calculateRemainingTime(timeslot.time, timeList[index])}
                </p>
              </IonCol>
            </IonRow>
            <div id="balken" style={{ width: "89%", backgroundColor: "#ccc" }}>
              <div
                style={{
                  width: `${
                    index === activeTimeslotIndex
                      ? calculateProgress(timeslot.time, currentTime) * 100
                      : index > activeTimeslotIndex
                      ? calculateProgress(timeslot.time, 0) * 100
                      : calculateProgress(timeslot.time, timeList[index]) * 100
                  }%`,
                  backgroundColor: `${
                    index === activeTimeslotIndex
                      ? timeslot.time * 60 >= currentTime
                        ? "#aad4cf"
                        : "#ff0000"
                      : index < activeTimeslotIndex
                      ? timeslot.time * 60 >= timeList[index]
                        ? "#aad4cf"
                        : "#ff0000"
                      : "#aad4cf"
                  }`,
                  height: "10px",
                }}
              />
            </div>
          </div>
        ))}

        <IonItem id="startStop">
          <IonRow>
            <IonCol>
              <IonIcon
                id="play"
                size="large"
                icon={playCircleOutline}
                onClick={() => {
                  startTimerOnce();
                  // Starte den Timer bei jedem Klick auf den Button "Start"
                }}
              ></IonIcon>
            </IonCol>
            <IonCol>
              <p id="watchStart">Start</p>
            </IonCol>
            <IonCol>
              <IonIcon
                onClick={stopTimer}
                id="stop"
                size="large"
                icon={pauseCircleOutline}
              ></IonIcon>
            </IonCol>
            <IonCol>
              <p id="watchStart">Pause</p>
            </IonCol>
          </IonRow>
        </IonItem>
        {activeTimeslotIndex < timeslots.length - 1 && (
          <IonButton
            expand="block"
            shape="round"
            size="large"
            onClick={goToNextTimeSlot}
            id="oben"
          >
            Nächstes Thema
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default WatchStart;
