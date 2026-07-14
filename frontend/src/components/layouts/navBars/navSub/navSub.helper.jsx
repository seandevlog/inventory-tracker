import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

import AppContext from "@contexts/app.context";

import Redirect from "@components/ui/redirect/redirect";

import firstCharUppercase from "@utils/firstCharUppercase";
import splitUppercase from "@utils/splitUppercase";

import config from "@config";

const { path } = config;

const QuickAction = ({
  id,
  selected,
  onSelect,
  Component,
  Action,
  classes,
  showIcon,
}) => {
  const [isDropShown, setIsDropShown] = useState(false);

  const handleClick = () => {
    onSelect?.(id);

    setIsDropShown((current) => !current);
  };

  const label = splitUppercase(firstCharUppercase(id));

  return (
    <>
      <button
        id={id}
        type="button"
        className={`${classes.navControl} ${
          selected === id ? classes.actionSelected : ""
        }`}
        onClick={handleClick}
        aria-expanded={isDropShown}
      >
        {showIcon && Component && <Component />}

        <span>{label}</span>
      </button>

      <div
        className={
          isDropShown
            ? classes.showDrop
            : classes.hideDrop
        }
      >
        {Action && <Action />}
      </div>
    </>
  );
};

const QuickActionList = ({
  list,
  classes,
  showIcons = false,
}) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected((current) =>
      current === id ? null : id
    );
  };

  return list?.map(
    ({ name, Component, Action }) => (
      <li key={name} className={classes.navItem}>
        <QuickAction
          id={name}
          Component={Component}
          selected={selected}
          classes={classes}
          onSelect={handleSelect}
          Action={Action}
          showIcon={showIcons}
        />
      </li>
    )
  );
};

const RedirectLink = ({
  id,
  url,
  selected,
  onSelect,
  children,
  Component,
  classes,
  showIcon,
}) => {
  const { pathname } = useLocation();

  const [isParentClicked, setIsParentClicked] =
    useState(false);

  const isSelected =
    selected === id || url === pathname;

  const handleClick = () => {
    onSelect?.(id);
    setIsParentClicked(true);
  };

  return (
    <div
      id={id}
      className={`${classes.redirectControl} ${
        isSelected ? classes.linkSelected : ""
      }`}
      onClick={handleClick}
    >
      <Redirect
        url={url}
        Component={showIcon ? Component : null}
        isParentClicked={isParentClicked}
        setIsParentClicked={setIsParentClicked}
      >
        {children}
      </Redirect>
    </div>
  );
};

const RedirectList = ({
  list,
  classes,
  showIcons = false,
}) => {
  const { profile } = useContext(AppContext);
  const { role } = profile ?? {};

  const renderLinks =
    role === "admin"
      ? list ?? []
      : list?.filter(({ name }) => name !== "users") ??
        [];

  const [selected, setSelected] = useState("");

  return renderLinks.map(({ name, Component }) => (
    <li key={name} className={classes.navItem}>
      <RedirectLink
        id={name}
        url={path[name].absolute}
        Component={Component}
        selected={selected}
        onSelect={setSelected}
        classes={classes}
        showIcon={showIcons}
      >
        {firstCharUppercase(name)}
      </RedirectLink>
    </li>
  ));
};

export {
  QuickActionList,
  RedirectList,
};