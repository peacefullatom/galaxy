import './SelectSpecies.scss';

import React from 'react';

import { speciesBuilder } from '../../../../data/species/builder';
import { speciesHuman } from '../../../../data/species/human';
import { speciesNomad } from '../../../../data/species/nomad';
import { speciesPopulation } from '../../../../data/species/population';
import { speciesScientist } from '../../../../data/species/scientist';
import { speciesSpy } from '../../../../data/species/spy';
import { useGalaxy } from '../../../galaxy/GalaxyContext';
import StartLayout from '../start-layout/StartLayout';
import { startLocationSetupSpecies } from '../Start.const';
import { useStart } from '../StartContext';
import { TSelectSpecies } from './SelectSpecies.types';
import SpeciesDetails from './species-details/SpeciesDetails';
import SpeciesList from './species-list/SpeciesList';

const predefinedSpecies = [
  speciesHuman,
  speciesBuilder,
  speciesNomad,
  speciesPopulation,
  speciesScientist,
  speciesSpy,
];

const SelectSpecies: React.FC<TSelectSpecies> = () => {
  const { galaxy } = useGalaxy();
  const { setView } = useStart();

  return (
    <StartLayout forward={(): void => setView(startLocationSetupSpecies)}>
      <div className='select_species'>
        <SpeciesList selection={galaxy.player} species={predefinedSpecies} />
        <SpeciesDetails />
      </div>
    </StartLayout>
  );
};

export default SelectSpecies;
