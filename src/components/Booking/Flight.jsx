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

const CustomSearchableDropdown = () => {
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
    <div
      className='d-flex align-items-center justify-content-center booking-wrapper'
      style={{ height: '700px' }}
    >
      <div
        className='d-flex align-items-center justify-content-center gap-2 bg-primary'
        style={{ height: '200px', position: 'relative' }}
      >
        <div
          className='d-flex   align-items-center justify-content-center gap-4 '
          style={{ position: 'relative' }}
        >
          <div className='mb-3 border p-2 bg-white'>
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
          <div className='mb-3 border p-2 bg-white'>
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
            style={{ position: 'absolute', bottom: '40%' }}
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
        <div className='d-flex align-items-center justify-content-center '>
          <div className='mb-3 border p-2 bg-white'>
            {/* <label htmlFor='journeyDate'>Journey Date:</label> */}
            <DatePicker
              selected={journeyDate}
              onChange={handleJourneyDateChange}
              dateFormat='yyyy-MM-dd'
              placeholderText='Select Journey Date'
              customInput={
                <div
                  onClick={() => journeyDateRef.current.setOpen(true)}
                  style={{
                    cursor: 'pointer',
                    border: '0',
                    padding: '0px',
                    height: '75px',
                    width: '200px',
                  }}
                >
                  {journeyDate ? (
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          paddingLeft: '0px',
                          fontWeight: '400',
                        }}
                      >
                        Journey Date
                      </p>
                      {journeyDate.toDateString()}{' '}
                    </div>
                  ) : (
                    'Select Journey date'
                  )}
                </div>
              }
              ref={journeyDateRef}
            />
          </div>

          <div className='mb-3 border p-2 bg-white '>
            {/* {!returnDate && <label htmlFor='returnDate'>Return Date</label>} */}
            {/*  */}
            <DatePicker
              selected={returnDate}
              onChange={handleReturnDateChange}
              dateFormat='yyyy-MM-dd'
              placeholderText='Select date'
              customInput={
                <div
                  onClick={() => returnDateRef.current.setOpen(true)}
                  style={{
                    cursor: 'pointer',
                    border: '0',
                    padding: '0px',
                    height: '75px',
                    width: '200px',
                  }}
                >
                  {returnDate ? (
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          paddingLeft: '0px',
                          fontWeight: '400',
                        }}
                      >
                        Return Date
                      </p>
                      {returnDate.toDateString()}
                    </div>
                  ) : (
                    <div className='d-flex flex-column gap-3'>
                      <span>Return Date</span>{' '}
                      <span
                        style={{
                          fontSize: '12px',
                          paddingLeft: '0px',
                          fontWeight: '400',
                        }}
                      >
                        Save More On Return Flight
                      </span>{' '}
                    </div>
                  )}
                </div>
              }
              ref={returnDateRef}
            />
          </div>
          <div
            className={`d-flex flex-column `}
            style={{ position: 'relative' }}
          >
            {' '}
            <div
              className={`${
                isDropdownClicked ? 'bg-light bg-gradient' : 'bg-white'
              }`}
              style={{
                width: '200px',
                border: 'solid 1px #DCDCDC',
                height: '92px',
                marginBottom: '16px',
                cursor: 'pointer',
                whiteSpace: 'nowrap', // Prevent text from wrapping
                overflow: 'hidden', // Hide any overflowing text
                textOverflow: 'ellipsis', // Show ellipsis (...) for overflow
              }}
              onClick={handleDropdownClick}
            >
              {/* Dropdown content */}
              <div
                className='d-flex align-items-center justify-content-between p-2'
                style={{ height: '100%' }}
              >
                <div className=''>
                  <p
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      fontWeight: '400',
                      paddingTop: '10px',
                    }}
                  >
                    Traveler Class
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      paddingLeft: '10px',
                      fontWeight: '400',
                      paddingTop: '0px',
                    }}
                  >
                    Business
                  </p>
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                  <p
                    style={{
                      fontSize: '44px',
                      paddingLeft: '0px',
                      fontWeight: '700',
                      paddingTop: '10px',
                    }}
                  >
                    1
                  </p>
                  <p style={{ fontSize: '14px' }}>Traveler</p>
                </div>
              </div>
            </div>
            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  border: 'solid 2px #DCDCDC',
                  backgroundColor: 'white',
                  padding: '8px',
                  zIndex: 2,
                  width: '300px',
                }}
              >
                {' '}
                {/* Dropdown menu */}
                <div>
                  <div
                    className='d-flex align-items-center justify-content-between '
                    style={{ borderBottom: '1px solid #DCDCDC' }}
                  >
                    <div className=''>
                      <p style={{ fontSize: '13px', marginBottom: '0' }}>
                        Adults
                      </p>
                      <p style={{ fontSize: '12px', color: 'gray' }}>
                        12 years and above
                      </p>
                    </div>
                    <div className='d-flex align-items-center justify-content-around'>
                      <button>
                        <div className='pa'>
                          <BiMinus
                            style={{
                              border: '1px solid #DCDCDC',
                              borderRadius: '100%',
                              fontSize: '26px',
                            }}
                          />
                        </div>
                      </button>
                      <div className='p-3'>1</div>
                      <button>
                        <div className=''>
                          <BiPlus
                            style={{
                              border: '1px solid #DCDCDC',
                              borderRadius: '100%',
                              fontSize: '26px',
                            }}
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                  <div>
                    <div
                      className='d-flex align-items-center justify-content-between'
                      style={{ borderBottom: '1px solid #DCDCDC' }}
                    >
                      <div className=''>
                        <p style={{ fontSize: '13px', marginBottom: '0' }}>
                          Children
                        </p>
                        <p style={{ fontSize: '12px', color: 'gray' }}>
                          2-11 Years old
                        </p>
                      </div>
                      <div className='d-flex align-items-center justify-content-around'>
                        <button>
                          <div className='pa'>
                            <BiMinus
                              style={{
                                border: '1px solid #DCDCDC',
                                borderRadius: '100%',
                                fontSize: '26px',
                              }}
                            />
                          </div>
                        </button>
                        <div className='p-3'>1</div>
                        <button>
                          <div className=''>
                            <BiPlus
                              style={{
                                border: '1px solid #DCDCDC',
                                borderRadius: '100%',
                                fontSize: '26px',
                              }}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className='d-flex flex-wrap align-items-center justify-content-between'>
                      <div>
                        <p style={{ fontSize: '10px', marginBottom: '0' }}>
                          Child 1 age
                        </p>
                        <select name='' id='' style={{ width: '100%' }}>
                          <option value=''>1</option>
                          <option value=''>2</option>
                          <option value=''>3</option>
                          <option value=''>4</option>
                          <option value=''>5</option>
                          <option value=''>6</option>
                          <option value=''>7</option>
                          <option value=''>8</option>
                          <option value=''>9</option>
                          <option value=''>10</option>
                          <option value=''>11</option>
                        </select>
                      </div>
                      <div>
                        <p style={{ fontSize: '10px', marginBottom: '0' }}>
                          Child 2 age
                        </p>
                        <select name='' id='' style={{ width: '100%' }}>
                          <option value=''>1</option>
                          <option value=''>2</option>
                          <option value=''>3</option>
                          <option value=''>4</option>
                          <option value=''>5</option>
                          <option value=''>6</option>
                          <option value=''>7</option>
                          <option value=''>8</option>
                          <option value=''>9</option>
                          <option value=''>10</option>
                          <option value=''>11</option>
                        </select>
                      </div>
                      <div>
                        <p style={{ fontSize: '10px', marginBottom: '0' }}>
                          Child 3 age
                        </p>
                        <select name='' id='' style={{ width: '100%' }}>
                          <option value=''>1</option>
                          <option value=''>2</option>
                          <option value=''>3</option>
                          <option value=''>4</option>
                          <option value=''>5</option>
                          <option value=''>6</option>
                          <option value=''>7</option>
                          <option value=''>8</option>
                          <option value=''>9</option>
                          <option value=''>10</option>
                          <option value=''>11</option>
                        </select>
                      </div>
                      <div>
                        <p style={{ fontSize: '10px', marginBottom: '0' }}>
                          Child 4 age
                        </p>
                        <select name='' id='' style={{ width: '100%' }}>
                          <option value=''>1</option>
                          <option value=''>2</option>
                          <option value=''>3</option>
                          <option value=''>4</option>
                          <option value=''>5</option>
                          <option value=''>6</option>
                          <option value=''>7</option>
                          <option value=''>8</option>
                          <option value=''>9</option>
                          <option value=''>10</option>
                          <option value=''>11</option>
                        </select>
                      </div>
                    </div>
                    <p className='text-danger' style={{ fontSize: '13px' }}>
                      Please add child age
                    </p>
                  </div>
                  <div>
                    <div
                      className='d-flex align-items-center justify-content-between'
                      style={{ borderBottom: '1px solid #DCDCDC' }}
                    >
                      <div className=''>
                        <p style={{ fontSize: '13px', marginBottom: '0' }}>
                          Infant
                        </p>
                        <p style={{ fontSize: '12px' }}>Below 2 years</p>
                      </div>
                      <div className='d-flex align-items-center justify-content-around'>
                        <button>
                          <div className='pa'>
                            <BiMinus
                              style={{
                                border: '1px solid #DCDCDC',
                                borderRadius: '100%',
                                fontSize: '26px',
                              }}
                            />
                          </div>
                        </button>
                        <div className='p-3'>1</div>
                        <button>
                          <div className=''>
                            <BiPlus
                              style={{
                                border: '1px solid #DCDCDC',
                                borderRadius: '100%',
                                fontSize: '26px',
                              }}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className='d-flex align-items-center justify-content-between'
                      style={{ borderBottom: '1px solid #DCDCDC' }}
                    >
                      <div className=''>
                        <p style={{ fontSize: '13px', marginBottom: '0' }}>
                          Class
                        </p>
                        <div className='d-flex align-items-center text-center gap-3'>
                          <div class='form-check d-flex align-items-center gap-2'>
                            <input
                              class='form-check-input'
                              type='radio'
                              name='business'
                              id='business'
                            />
                            <label
                              class='form-check-label'
                              for='business'
                              style={{ fontSize: '13px' }}
                            >
                              Business
                            </label>
                          </div>
                          <div class='form-check d-flex align-items-center gap-2'>
                            <input
                              class='form-check-input'
                              type='radio'
                              name='economy'
                              id='economy'
                            />
                            <label
                              class='form-check-label'
                              for='economy'
                              style={{ fontSize: '13px' }}
                            >
                              Economy
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-20px' }}></div>
      </div>
    </div>
  );
};

// // Component for Flight tab
// const FlightTab = () => {
//   // Add your input fields for Flight here
//   return (
//     <div>
//       <h3>Flight Tab</h3>
//       {/* Add your input fields for Flight */}
//     </div>
//   );
// };

// // Component for Hotels tab
// const HotelsTab = () => {
//   // Add your input fields for Hotels here
//   return (
//     <div>
//       <h3>Hotels Tab</h3>
//       {/* Add your input fields for Hotels */}
//     </div>
//   );
// };

// // Component for Tour tab
// const TourTab = () => {
//   // Add your input fields for Tour here
//   return (
//     <div>
//       <h3>Tour Tab</h3>
//       {/* Add your input fields for Tour */}
//     </div>
//   );
// };

export default CustomSearchableDropdown;
