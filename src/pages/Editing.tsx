// import React, { useState } from "react";
// import {
//   IonContent,
//   IonButton,
//   IonList,
//   IonItem,
//   IonInput,
//   IonIcon,
//   IonReorder,
//   IonReorderGroup,
//   ItemReorderEventDetail,
// } from "@ionic/react";
// import "./ThemaEditing";

// import { add } from "ionicons/icons";

// // TODO create timeslot and get all timeslots onclick, abspeichern in objekt dann cards ausgeben.
// /* TODO
//      Step 1: Alle timeslots anzeigen: Kann man einen for loop fuer nutzen
//      Step 2: Wenn man auf plus drueckt muss der timeslot gespeichert werden mit createTimeslot
//  */

// //  TODO das muss beim navigieren auf diese seite ausgefuehrt werden und meetingID muss halt mit uebergeben werden immer. 


//       fetch(`http://localhost:3000/meetings/${meetingId}/timeslots`)
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Timeslot-Daten:", data);
//             })
//             .catch((error) => {
//                 console.error("Fehler beim Abrufen des Meetings:", error);
//             });
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
    
//     // Senden Sie den POST-Request an die API
//     fetch("http://localhost:3000/meetings/${meetingId}/timeslots", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData), // TODO das ist der ort zum daten mitteilen am besten gibst du von hause aus einen namen und eine zeit mit. Guck dir die datenstruktur nochmal an und besprich mit mir wie es geaendert werden muss.
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Verarbeiten Sie die Antwort der API
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Fehler beim Senden des POST-Requests:", error);
//       });
//   };


import React, { useState } from "react";
import {
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonInput,
  IonIcon,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,

} from "@ionic/react";
import "./ThemaEditing";
import { add} from 'ionicons/icons';

const Editing: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const adminLink = localStorage.getItem("adminLink")?.replaceAll('"','');
  console.log(adminLink);
  const addItem = () => {
    const newItem = `Thema ${items.length + 1}`;
    setItems([...items, newItem]);
    
  // HTTP POST-Anfrage an den Server, um den Timeslot zu erstellen
  fetch(`http://localhost:3000/meetings/${adminLink}/timeslots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: newItem,
      // Weitere Eigenschaften des Timeslots können hier hinzugefügt werden
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data)) // Hier kannst du die Antwort verarbeiten, wenn nötig
    .catch((error) =>
      console.error("Fehler beim Erstellen des Timeslots:", error)
    );
  };

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  return (
    <IonContent class="ion-padding">
      <h2>Meeting A</h2>
      <IonList>
        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          {items.map((item, index) => (
            <IonItem key={index} href="/ThemaEditing">
                <IonInput label={item} placeholder="00:14:00"></IonInput>
              <IonReorder slot="end"></IonReorder>
            </IonItem>
          ))}
        </IonReorderGroup>
      </IonList>
        <p>Zeit insgesamt: </p>
      <IonButton onClick={addItem}>
        <IonIcon slot="icon-only" icon={add}></IonIcon>
      </IonButton>
      <IonButton expand="full">
        Speichern
      </IonButton>
    </IonContent>
  );
};

export default Editing;

