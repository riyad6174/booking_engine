import React, { useState } from 'react';
import CustomSearchableDropdown from '../booking';
import { MdFlightTakeoff } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiPalmTree } from 'react-icons/gi';
import Hotel from '@/components/Booking/Hotel';
import Tour from '@/components/Booking/Tour';
import CustomSearchableDropdown2 from '@/components/Booking/Flight2';
import Flight2 from '@/components/Booking/Flight2';

function index() {
  const [activeTab, setActiveTab] = useState('flight');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div
        className='d-flex align-items-center justify-content-center booking-wrapper'
        style={{ backgroundColor: '#DCDCDC', height: '100vh' }}
      >
        <div
          className='d-flex flex-column align-items-center justify-content-center bg-white'
          style={{
            border: '2px solid black',
            padding: '20px 20px',
            position: 'relative',
            height: '200px',
          }}
        >
          {/* Tabs */}
          <div
            className='d-flex align-items-center justify-content-center gap-5 p-2 '
            style={{
              border: '1px solid black',
              backgroundColor: 'white',
              position: 'absolute',
              top: '-25px',
              zIndex: '9999',
            }}
          >
            <button onClick={() => handleTabChange('flight')}>
              <div style={{ fontSize: '18px', fontWeight: '600' }}>
                <MdFlightTakeoff />
                Flight
              </div>
            </button>
            <button
              onClick={() => handleTabChange('hotels')}
              style={{ fontSize: '18px', fontWeight: '600' }}
            >
              <BiBuildingHouse />
              Hotels
            </button>
            <button
              onClick={() => handleTabChange('tour')}
              style={{ fontSize: '18px', fontWeight: '600' }}
            >
              <GiPalmTree />
              Tour
            </button>
          </div>
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ height: '150px' }}
          >
            {/* Display tab content based on the active tab */}
            {activeTab === 'flight' && <FlightTab />}
            {activeTab === 'hotels' && <HotelsTab />}
            {activeTab === 'tour' && <TourTab />}
          </div>

          {/* ... (Rest of the code) */}
          <div className='' style={{ position: 'absolute', bottom: '-20px' }}>
            <button
              className='border border-dark '
              style={{
                border: '2px solid black',

                padding: '10px',
                backgroundColor: '#fccd03',
                width: '150px',
                fontSize: '18px',
                fontWeight: '350',
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;

// Component for Flight tab
const FlightTab = () => {
  // Add your input fields for Flight here
  return (
    <div className='d-flex align-items-center justify-content-center'>
      <Flight2 />
    </div>
  );
};

// Component for Hotels tab
const HotelsTab = () => {
  // Add your input fields for Hotels here
  return (
    <div>
      <Hotel />
      {/* Add your input fields for Hotels */}
    </div>
  );
};

// Component for Tour tab
const TourTab = () => {
  // Add your input fields for Tour here
  return (
    <div>
      <Tour />
      {/* Add your input fields for Tour */}
    </div>
  );
};
