import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Watch from "./pages/Watch";
import Editing from "./pages/Editing";
import ThemaEditing from "./pages/ThemaEditing";
import Suggestions from "./pages/Suggestions";
import Parti_Suggestions from "./pages/Parti_Suggestion";
import Parti_Start from "./pages/Parti_Start";
import MeetingStart from "./pages/MeetingStart";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Overview">
            <Overview />
          </Route>
          <Route exact path="/Editing">
            <Editing />
          </Route>
          <Route exact path="/Watch">
            <Watch />
          </Route>
          <Route exact path="/ThemaEditing">
            <ThemaEditing />
          </Route>
          <Route exact path="/Suggestions">
            <Suggestions />
          </Route>
          <Route exact path="/MeetingStart">
            <MeetingStart />
          </Route>
          <Route exact path="/Parti_Suggestion">
            <Parti_Suggestions />
          </Route>
          <Route exact path="/Parti_Start">
            <Parti_Start />
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;