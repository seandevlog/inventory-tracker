import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import AppContext from '@contexts/app.context';

import Redirect from '@components/redirect/redirect';

import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';

import config from '@config';
const { path } = config;

const QuickAction = ({ 
  id, selected, onSelect, Component, Action, classes
}) => {

  const [isDrop, setIsDrop] = useState(false);

  const handleClick = (event) => {
    if (onSelect) onSelect(event);
    setIsDrop(prev => !prev);
  }

  return (
    <>
      <div 
        id={id}
        className={(selected === id) || !id
          ? classes.actionSelected
          : undefined
        }
        onClick={handleClick}
      >
        {Component && <Component/>}
        <a>{splitUppercase(firstCharUppercase(id))}</a>
      </div>
      <div className={isDrop ? classes.showDrop : classes.hideDrop}>
        {Action && <Action/>}
      </div>
    </>
  )
}

const QuickActionList = ({ list, classes, setIsNavStretched }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (event) => {
    setSelected(event.target.id);
    if (setIsNavStretched) setIsNavStretched(prev => !prev);
  };

  const isMobile = window.innerWidth <= 570; 

  return (
    list?.map(({name, Component, Action}) => (
      <li key={name}>
        <QuickAction
          id={name}
          Component={isMobile && Component}
          selected={selected}
          classes={classes}
          onSelect={handleSelect}
          Action={Action}
        />
      </li>
    ))
  )
} 

const RedirectLink = ({ 
  id, url, selected, onSelect, children, Component, classes 
}) => {
  const { pathname } = useLocation();
  const [ isParentClicked, setIsParentClicked ] = useState(false);

  const handleClick = (event) => {
    if (onSelect) onSelect(event);
  }

  return (
    <div 
      id={id}
      className={(selected === id) || (url === pathname) || !id
        ? classes.linkSelected
        : undefined
      }
      onClick={handleClick}
      onClickCapture={() => setIsParentClicked(true)}
    >
      <Redirect
        url={url}
        Component={Component}
        isParentClicked={isParentClicked}
        setIsParentClicked={setIsParentClicked}
      >
        {children}  
      </Redirect>
    </div>
  )
}

const RedirectList = ({ list, classes }) => {
  const { profile } = useContext(AppContext);

  const { role } = profile ?? {};
  const renderLinks = role !== 'admin'
    ? list.filter(({name}) => name !== 'users') 
    : list ?? [];

  const [selected, setSelected] = useState('');

  const handleSelect = (event) => {
    setSelected(event.target.id);
  };

  const isMobile = window.innerWidth <= 570; 

  return (
    renderLinks?.map(({name, Component}) => (
      <li key={name}>
        <RedirectLink
          url={path[name].absolute}
          Component={isMobile && Component}
          id={name}
          onSelect={handleSelect}
          selected={selected}
          classes={classes}
        >
          {firstCharUppercase(name)}
        </RedirectLink>
      </li>
    ))
  )
} 

export { 
  QuickActionList,
  RedirectList
}