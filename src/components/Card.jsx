/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import useShowable from "../hooks/useShowable";
import useRendersNumber from "../hooks/useRendersNumber";

function FoldableCard({opened, title, onToggleOpened, ...props}) {
  const { isShown, toggleShown, setIsShown, className } = useShowable(opened);
  useEffect(() => {
    setIsShown(opened), [opened]
  });
  return (
    <Card
      title={
        <>{title} <FontAwesomeIcon className="foldable-icon" icon={isShown ? faCircleMinus : faCirclePlus}
        /></>
      }
      className={`card foldable`}
      onClick={() => onToggleOpened(!isShown)}
      opened={opened}
      {...props}
    />
  );
}

function Cards({ cardsData }) {
  const [openedIndex, setOpenedIndex] = useState(true);
  return (
    <div className="cards">
      {cardsData.map(({ id, title, content }) => (
        <FoldableCard
          title={title}
          key={id.toString()}
          opened={openedIndex === id}
          onToggleOpened={(isShown) => setOpenedIndex(isShown ? id : null)}
        >
          {content}
        </FoldableCard>
      ))}
    </div>
  );
}

Cards.propTypes = {
  // eslint-disable-next-line react/require-default-props
  cardsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

function Card({ title, className, children, onClick, opened }) {
  const res = opened ? "shown" : "";
  const resultCount = useRendersNumber();
  return (
    <button
      type="button"
      className={`${className} ${res}`}
      onClick={onClick}
    >
      <header className="card__header header__title">
        [{resultCount}] {title}
      </header>
      <section className="card__main">
        {opened ? children : ""}
      </section>
    </button>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

FoldableCard.propTypes = {
  title: Node.propTypes,
  content: Node.propTypes,
  opened: Boolean.propTypes,
};

FoldableCard.defaultProps = {
  title: "Title",
  content: "Content",
  opened: false,
};

function Notification({ data, ...props }) {
  return (
    <Card
    className="card notification"
    title={
      <>{data.title} <FontAwesomeIcon className="notification-icon" icon={faCircleXmark}
      /></>
    }
    children={data.content}
    opened
    onClick={() => {
      console.log("delete");
      props.onDelete(data.key);
    }}
    />
  );
}

function NotificationsCenter({ notificationsData, ...props }) {
  const resultCount = useRendersNumber();
  return (
    <>
      <div className="notifications-center">
        [{resultCount}] {notificationsData.length > 1 ? notificationsData.length + " notifications" : notificationsData.length + " notification"}
      </div>
      <div className="notifications">
        {notificationsData.map((notification) => (
          <Notification data={notification} key={notification.id}
          onDelete={props.onDelete} />
        ))}
      </div>
    </>
  );
}

export { Cards, NotificationsCenter };