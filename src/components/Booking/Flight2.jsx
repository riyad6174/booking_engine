import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { IoIosArrowDown, IoIosSwap } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsArrowDown } from 'react-icons/bs';
import { BiMinus, BiPlus } from 'react-icons/bi';


const options = [
  {
    value: 'JFK',
    label: 'New York',
    airport: 'John F. Kennedy Airport ',
    code: 'JFK',
  },
  {
    value: 'LAX',
    label: 'Los Angeles',
    airport: 'Los Angeles International Airport ',
    code: 'LAX',
  },
  // Add more airport options here...
];

const getOptionLabel = (option) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div>
        <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{option.label}</p>
        <p style={{ fontSize: '12px', marginTop: 0 }}>{option.airport}</p>
      </div>
      <div>
        <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{option.code}</p>
      </div>
    </div>
  );
};

const Flight2 = () => {
  const [fromSelectedOption, setFromSelectedOption] = useState(null);
  const [toSelectedOption, setToSelectedOption] = useState(null);
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [activeTab, setActiveTab] = useState('flight');
  const fromAirportRef = useRef(null);
  const toAirportRef = useRef(null);
  const journeyDateRef = useRef(null);
  const returnDateRef = useRef(null);

  const [journeyDate, setJourneyDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const travelClassRef = useRef(null);

  const customStyles = {
    // ... (other styles)
    option: (provided) => ({
      ...provided,
      padding: '10px', // Adjust padding for options
    }),
  };

  const handleFromChange = (selectedOption) => {
    setFromSelectedOption(selectedOption);
    toAirportRef.current.onMenuOpen(true);
  };

  const handleToChange = (selectedOption) => {
    setToSelectedOption(selectedOption);
    journeyDateRef.current.setOpen(true);
    // journeyDateRef.current.focus();
  };

  //   const handleJourneyDateChange = (e) => {
  //     setJourneyDate(e.target.value);
  //     returnDateRef.current.focus();
  //   };

  //   const handleReturnDateChange = (e) => {
  //     setReturnDate(e.target.value);
  //   };

  const handleJourneyDateChange = (date) => {
    setJourneyDate(date);
    // returnDateRef.current.focus();
    returnDateRef.current.setOpen(true);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
  };

  const handleExchangeClick = () => {
    const tempOption = fromSelectedOption;
    setFromSelectedOption(toSelectedOption);
    setToSelectedOption(tempOption);
  };
  const menuPosition = {
    top: 'auto',
    bottom: '100%', // Position the menu above the select input
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderCustomDayContents = (day, date) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{day}</span>
        <span style={{ fontSize: '12px' }}>{date}</span>
      </div>
    );
  };

  const renderCustomDayName = (dayName) => {
    return (
      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{dayName}</span>
    );
  };

  const renderCustomMonthText = (month) => {
    return <span style={{ fontSize: '18px' }}>{month}</span>;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownClicked((prevState) => !prevState);
    setIsOpen(!isOpen);
  };

  const handleTravelClassChange = (e) => {
    // Handle the travel class change here
  };

  const renderTravelClassOptions = () => {
    // Replace this with your travel class options
    const travelClassOptions = ['Economy', 'Business', 'First Class'];
    return travelClassOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <div className='' style={{}}>
      <div className='row'>
        {/* First Content */}
        <div className='col col-md-3'>
          <div className='row'>
            <div className='col-md-6'>
              {/* First div inside the first content */}
              <div
                className='d-flex   align-items-center justify-content-center gap-4 '
                style={{ position: 'relative' }}
              >
                <div className='border p-2 bg-white'>
                  <label
                    htmlFor='fromAirport'
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      fontWeight: '400',
                    }}
                  >
                    From
                  </label>
                  <Select
                    ref={fromAirportRef}
                    id='fromAirport'
                    options={options}
                    value={fromSelectedOption}
                    menuPosition={menuPosition}
                    getOptionLabel={getOptionLabel}
                    onChange={handleFromChange}
                    isSearchable
                    styles={{
                      singleValue: (provided) => ({
                        ...provided,
                      }),
                      control: (provided) => ({
                        ...provided,
                        border: 'none',
                        boxShadow: 'none',
                        width: '300px',
                        height: '50px',
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        ...dropdownIndicatorStyles,
                        padding: '0 8px', // Add padding to adjust the position of the icon
                      }),
                    }}
                    placeholder='Select from the list...'
                    //   onKeyDown={(e) => handleKeyDown(e, fromAirportRef)}
                    components={{
                      IndicatorSeparator: () => null, // Hide the separator between the icon and value
                      DropdownIndicator: () => null, // Use the icon as the dropdown indicator
                    }}
                    //   placeholder='Select from the list...'
                  />
                </div>
                <div className=' border p-2 bg-white'>
                  <label
                    htmlFor='toAirport'
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      fontWeight: '400',
                    }}
                  >
                    To
                  </label>
                  <Select
                    ref={toAirportRef}
                    id='toAirport'
                    options={options}
                    value={toSelectedOption}
                    getOptionLabel={getOptionLabel}
                    onChange={handleToChange}
                    isSearchable
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: 'none',
                        boxShadow: 'none',
                        width: '300px',
                        height: '50px',
                      }),
                      dropdownIndicator: (provided) => ({
                        ...provided,
                        ...dropdownIndicatorStyles,
                        padding: '0 8px', // Add padding to adjust the position of the icon
                      }),
                    }}
                    components={{
                      IndicatorSeparator: () => null, // Hide the separator between the icon and value
                      DropdownIndicator: () => null, // Use the icon as the dropdown indicator
                    }}
                    placeholder='Select from the list...'
                  />
                </div>
                <div
                  className='text-center'
                  style={{ position: 'absolute', bottom: '30%' }}
                >
                  <div
                    onClick={handleExchangeClick}
                    className='p-2  '
                    style={{
                      cursor: 'pointer',
                      borderRadius: '50%',
                      border: '1px solid gray',
                      width: '45px',
                      backgroundColor: 'white',
                    }}
                  >
                    <IoIosSwap style={{ fontSize: '25px' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              {/* Second div inside the first content */}
              <div className='content'>Content 2</div>
            </div>
          </div>
        </div>
        {/* Second Content */}
        <div className='col-md-3'>
          {/* First div inside the second content */}
          <div className='content'>Content 3</div>
          {/* Second div inside the second content */}
        </div>
        <div className='col-md-3'>
          {/* First div inside the second content */}
          <div className='content'>Content 3</div>
          {/* Second div inside the second content */}
        </div>
        {/* Third Content */}
        <div className='col-md-3'>
          <div className='content'>Content 5 (Full Width)</div>
        </div>
      </div>
    </div>
  );
};

export default Flight2;
