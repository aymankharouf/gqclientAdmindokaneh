import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import '../css/menu.css'
import labels from '../data/labels'
import { AuthContext } from '../auth-provider'

const appPages = [
  {
    title: 'Outbox',
    url: '/page/Outbox',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Favorites',
    url: '/page/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Archived',
    url: '/page/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Trash',
    url: '/page/Trash',
    iosIcon: trashOutline,
    mdIcon: trashSharp
  },
  {
    title: 'Spam',
    url: '/page/Spam',
    iosIcon: warningOutline,
    mdIcon: warningSharp
  }
];

const pages = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu = () => {
  const location = useLocation()
  const { state, dispatch } = React.useContext(AuthContext)
  let i = 0
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {state.user ?
            <IonMenuToggle key={i++} autoHide={false}>
              <IonItem button onClick={() => dispatch({type: 'LOGOUT'})} lines="none" detail={false}>
                <IonIcon slot="start" ios={mailOutline} md={mailSharp} />
                <IonLabel>{labels.logout}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          : <IonMenuToggle key={i++} autoHide={false}>
              <IonItem className={location.pathname === '/login' ? 'selected' : ''} routerLink="/login" routerDirection="none" lines="none" detail={false}>
                <IonIcon slot="start" ios={mailOutline} md={mailSharp} />
                <IonLabel>{labels.login}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          }
          {appPages.map(appPage => 
            <IonMenuToggle key={i++} autoHide={false}>
              <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {pages.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
