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

  const addItem = () => {
    const newItem = `Thema ${items.length + 1}`;
    setItems([...items, newItem]);
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
