import React from "react";
import { Cards, NotificationsCenter } from "./components/Card";
import cardsData from "./constants/cardsData";
import useNotificationsData from "./hooks/useNotificationsData";
import useRendersNumber from "./hooks/useRendersNumber";

function App() {
  const { notificationsData, addNotification, deleteNotification } = useNotificationsData();
  const resultCount = useRendersNumber();
  console.log(notificationsData);
  return (
    <div className="app">
      <header className="app__header header">
        <h1 className="header__title">[{resultCount}] Introduction to React</h1>
      </header>
      <main className="app__main">
        <button className="btn" onClick={addNotification}>Add a notification</button>
        <Cards cardsData={cardsData} />
      </main>
      <footer className="app__footer footer">
        <NotificationsCenter notificationsData={notificationsData} onDelete={deleteNotification} />
      </footer>
    </div>
  );
}

export default App;
