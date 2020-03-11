import './Menu.scss';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import { gameDefaultLocation } from '../Game.const';
import About from './about/About';
import Intro from './intro/Intro';
import Load from './load/Load';
import MenuItem from './menu-item/MenuItem';
import { TMenuItem } from './menu-item/MenuItem.types';
import { menuLocationAbout, menuLocationIntro, menuLocationLoad, menuLocationStart } from './Menu.const';
import { TMenu } from './Menu.types';
import Start from './start/Start';

const Menu: React.FC<TMenu> = ({
  menuView,
  galaxyData,
  setGalaxyData,
  setGameView,
}) => {
  const [screen, setScreen] = useState(menuView ?? gameDefaultLocation);
  const items: TMenuItem[] = [
    { title: 'Intro', action: (): void => setScreen(menuLocationIntro) },
    { title: 'Start', action: (): void => setScreen(menuLocationStart) },
    { title: 'Load', action: (): void => setScreen(menuLocationLoad) },
    { title: 'About', action: (): void => setScreen(menuLocationAbout) },
  ];

  if (screen === menuLocationIntro) {
    return <Intro setView={setScreen} />;
  }

  if (screen === menuLocationStart) {
    return (
      <Start
        setView={setScreen}
        galaxyData={galaxyData}
        setGalaxyData={setGalaxyData}
        setGameView={setGameView}
      />
    );
  }

  if (screen === menuLocationLoad) {
    return <Load setView={setScreen} />;
  }

  if (screen === menuLocationAbout) {
    return <About setView={setScreen} />;
  }

  return (
    <div className='menu'>
      {items.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
      <div className='menu_contact'>
        <a
          href='https://twitter.com/dominators_game'
          target='_blank'
          rel='noopener noreferrer'
        >
          Follow me for the updates! <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div>
  );
};

export default Menu;
