import './enzyme.config.js';
import React from 'react';
import {mount, shallow} from 'enzyme';


import AddUnit from "../src/components/Application/Options/AddUnit";


const startProperties = {

 addUnit: () => {}
};



function AddUnitTest() {

  const itineraryForm = shallow(<AddUnit addUniit={startProperties.addUnit}
  />);
  expect(itineraryForm.find('Card')).toHaveLength(1);
  expect(itineraryForm.find('Form')).toHaveLength(1);
}

test('Testing that the AddUnitTest component gets rendered', AddUnitTest);