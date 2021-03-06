import './CenterLayout.scss';

import React, { useEffect } from 'react';

import { gameDefaultLocation } from '../../Game.const';
import {
  commandCenterLocationEspionage,
  commandCenterLocationFleet,
  commandCenterLocationOptions,
  commandCenterLocationPlanets,
  commandCenterLocationResearch,
  commandCenterLocationStats,
  commandCenterModePause,
  commandCenterModePlay,
  commandCenterSpeedMax,
  commandCenterSpeedMin,
} from '../CommandCenter.const';
import { useCommandCenter } from '../CommandCenterContext';
import { TCenterLayout } from './CenterLayout.types';
import LayoutHeader from './layout-header/LayoutHeader';

const CenterLayout: React.FC<TCenterLayout> = ({ children }) => {
  const {
    speed,
    setSpeed,
    mode,
    setMode,
    setView,
    view,
    showNews,
    setShowNews,
    setFeed,
  } = useCommandCenter();
  const updateSpeed = (direction: 1 | -1): void => {
    const update = speed + direction;
    setSpeed(update);
    setFeed(`Speed is set to ${update}.`);
  };
  const keyboard = (event: KeyboardEvent): void => {
    const { keyCode } = event;
    // +
    if ((keyCode === 187 || keyCode === 107) && speed < commandCenterSpeedMax) {
      updateSpeed(1);
    }
    // -
    if ((keyCode === 189 || keyCode === 109) && speed > commandCenterSpeedMin) {
      updateSpeed(-1);
    }
    // p / space
    if (keyCode === 80 || keyCode === 32) {
      if (mode === commandCenterModePause) {
        setMode(commandCenterModePlay);
        setFeed(`Game resumed`);
      } else if (mode === commandCenterModePlay) {
        setMode(commandCenterModePause);
        setFeed(`Game paused`);
      }
    }
    // q
    if (keyCode === 81) {
      if (view !== commandCenterLocationOptions) {
        setView(commandCenterLocationOptions);
      } else if (view === commandCenterLocationOptions) {
        setView(gameDefaultLocation);
      }
    }
    // n
    if (keyCode === 78) {
      setShowNews(!showNews);
    }
    // c
    if (keyCode === 67) {
      setView(gameDefaultLocation);
    }
    // 1
    if (keyCode === 49 || keyCode === 97) {
      setView(commandCenterLocationFleet);
    }
    // 2
    if (keyCode === 50 || keyCode === 98) {
      setView(commandCenterLocationResearch);
    }
    // 3
    if (keyCode === 51 || keyCode === 99) {
      setView(commandCenterLocationEspionage);
    }
    // 4
    if (keyCode === 52 || keyCode === 100) {
      setView(commandCenterLocationPlanets);
    }
    // 5
    if (keyCode === 53 || keyCode === 101) {
      setView(commandCenterLocationStats);
    }
  };

  const mouse = (event: MouseEvent): void => {
    if (event.target) {
      const name = (event.target as HTMLElement).className;
      if (typeof name === 'string' && !name.match(/new_item/)) {
        setShowNews(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboard);
    document.addEventListener('mousedown', mouse);

    return (): void => {
      document.removeEventListener('keydown', keyboard);
      document.removeEventListener('mousedown', mouse);
    };
  });

  return (
    <div className='center_layout'>
      <LayoutHeader />
      {children}
    </div>
  );
};

export default CenterLayout;
