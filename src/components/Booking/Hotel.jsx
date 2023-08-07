import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { IoIosArrowDown, IoIosSwap } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowDown } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";

const options = [
  {
    value: "JFK",
    label: "New York",
    airport: "John F. Kennedy Airport ",
    code: "JFK",
  },
  {
    value: "LAX",
    label: "Los Angeles",
    airport: "Los Angeles International Airport ",
    code: "LAX",
  },
  // Add more airport options here...
];

const getOptionLabel = (option) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div>
        <p style={{ fontWeight: "bold", marginBottom: 0 }}>{option.label}</p>
        <p style={{ fontSize: "12px", marginTop: 0 }}>{option.airport}</p>
      </div>
      <div>
        <p style={{ fontWeight: "bold", marginBottom: 0 }}>{option.code}</p>
      </div>
    </div>
  );
};

const Hotel = () => {
  const [fromSelectedOption, setFromSelectedOption] = useState([
    {
      value: "JFK",
      label: "New York",
      airport: "John F. Kennedy Airport ",
      code: "JFK",
    },
  ]);
  const [toSelectedOption, setToSelectedOption] = useState([
    {
      value: "LAX",
      label: "Los Angeles",
      airport: "Los Angeles International Airport ",
      code: "LAX",
    },
  ]);
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [activeTab, setActiveTab] = useState("flight");
  const fromAirportRef = useRef(null);
  const toAirportRef = useRef(null);
  const journeyDateRef = useRef(null);
  const returnDateRef = useRef(null);
  const [totalChildren, setTotalChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalInfants, setTotalInfants] = useState(0);
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const travelClassRef = useRef(null);

  const customStyles = {
    // ... (other styles)
    option: (provided) => ({
      ...provided,
      padding: "10px", // Adjust padding for options
    }),
  };

  const handleFromChange = (selectedOption) => {
    setFromSelectedOption(selectedOption);
    toAirportRef.current.onMenuOpen(true);
    // toAirportRef.current.onMenuOpen(true);
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
    top: "auto",
    bottom: "100%", // Position the menu above the select input
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderCustomDayContents = (day, date) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>{day}</span>
        <span style={{ fontSize: "12px" }}>{date}</span>
      </div>
    );
  };

  const renderCustomDayName = (dayName) => {
    return (
      <span style={{ fontWeight: "bold", fontSize: "14px" }}>{dayName}</span>
    );
  };

  const renderCustomMonthText = (month) => {
    return <span style={{ fontSize: "18px" }}>{month}</span>;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleDropdownClick = () => {
  //   setIsDropdownClicked((prevState) => !prevState);
  //   setIsOpen(!isOpen);
  // };

  const handleTravelClassChange = (e) => {
    // Handle the travel class change here
  };

  const renderTravelClassOptions = () => {
    // Replace this with your travel class options
    const travelClassOptions = ["Economy", "Business", "First Class"];
    return travelClassOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation()
  };

  const handleChildIncrease = () => {
    setTotalChildren(totalChildren + 1);
    setChildrenAges([...childrenAges, 1]);
  };

  const handleChildDecrease = () => {
    if (totalChildren > 0) {
      setTotalChildren(totalChildren - 1);
      setChildrenAges(childrenAges.slice(0, childrenAges.length - 1));
    }
  };

  const handleAdultIncrease = () => {
    setTotalAdults(totalAdults + 1);
  };

  const handleAdultDecrease = () => {
    if (totalAdults > 0) {
      setTotalAdults(totalAdults - 1);
    }
  };

  const handleInfantIncrease = () => {
    setTotalInfants(totalInfants + 1);
  };

  const handleInfantDecrease = () => {
    if (totalInfants > 0) {
      setTotalInfants(totalInfants - 1);
    }
  };

  const handleAgeChange = (index, age) => {
    const updatedChildrenAges = [...childrenAges];
    updatedChildrenAges[index] = parseInt(age);
    setChildrenAges(updatedChildrenAges);
  };

  

  const getTotalPeople = () => {
    return totalChildren + totalAdults + totalInfants;
  };


  return (
    <div className="container-fluid">
    <div className="d-flex  align-items-center justify-content-center">

        <div
          className="single-form border rounded p-2 bg-white  "
          style={{ height: "80px" }}
        >
          <Select
            ref={fromAirportRef}
            id="fromAirport"
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
                border: "none",
                boxShadow: "none",
                width: "100%",
                height: "100%",
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                // ...dropdownIndicatorStyles,
                padding: "0 8px", // Add padding to adjust the position of the icon
              }),
            }}
            placeholder="Select from the list..."
            //   onKeyDown={(e) => handleKeyDown(e, fromAirportRef)}
            components={{
              IndicatorSeparator: () => null, // Hide the separator between the icon and value
              DropdownIndicator: () => null, // Use the icon as the dropdown indicator
            }}
            //   placeholder='Select from the list...'
          />
        </div>
   
      
        <div class="d-flex align-items-center justify-content-center gap-1 " style={{ height: "80px" }}>
          <div className="single-form border rounded  p-2 bg-white h-100">
            {/* <label htmlFor='journeyDate'>Journey Date:</label> */}
            <DatePicker
              selected={journeyDate}
              onChange={handleJourneyDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Journey Date"
              customInput={
                <div
                  onClick={() => journeyDateRef.current.setOpen(true)}
                  style={{
                    cursor: "pointer",
                    border: "0",
                    padding: "0px",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {journeyDate ? (
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          paddingLeft: "0px",
                          fontWeight: "700",
                          textAlign: "left",
                          marginBottom: "0",
                        }}
                      >
                        Journey Date
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          paddingLeft: "0px",
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >
                        {journeyDate.toDateString()}{" "}
                      </p>
                    </div>
                  ) : (
                    "Select Journey date"
                  )}
                </div>
              }
              ref={journeyDateRef}
            />
          </div>
    
        <div class=" " style={{ height: "80px" }}>
          <div className="single-form border rounded p-2 bg-white h-100 ">
            {/* {!returnDate && <label htmlFor='returnDate'>Return Date</label>} */}
            {/*  */}
            <DatePicker
              selected={returnDate}
              onChange={handleReturnDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
              customInput={
                <div
                  onClick={() => returnDateRef.current.setOpen(true)}
                  style={{
                    cursor: "pointer",
                    border: "0",
                    padding: "0px",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {returnDate ? (
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          paddingLeft: "0px",
                          fontWeight: "700",
                          textAlign: "left",
                          margin: "0",
                        }}
                      >
                        Return Date
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          paddingLeft: "0px",
                          fontWeight: "400",
                          textAlign: "left",
                          marginBottom: "0",
                        }}
                      >
                        {returnDate.toDateString()}
                      </p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-0 text-start">
                      <span
                        style={{
                          fontSize: "16px",
                          paddingLeft: "0px",
                          fontWeight: "700",
                          textAlign: "left",
                        }}
                      >
                        Return Date
                      </span>{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          paddingLeft: "0px",
                          fontWeight: "400",
                        }}
                      >
                        Save More On Return
                      </span>{" "}
                    </div>
                  )}
                </div>
              }
              ref={returnDateRef}
            />
          </div>
        </div>
        <div class="  dropdown" style={{ height: "80px" }}>
          <div
            className="dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              width: "100%",
              position: "relative",
              border: "solid 1px #DCDCDC",
              borderRadius: "5px",
              height: "100%",
              marginBottom: "0px",
              cursor: "pointer",
              whiteSpace: "nowrap", // Prevent text from wrapping
              overflow: "hidden", // Hide any overflowing text
              textOverflow: "ellipsis", // Show ellipsis (...) for overflow
            }}
            // onClick={handleDropdownClick}
          >
            {/* Dropdown content */}
            <div
              className="d-flex align-items-center justify-content-between p-2"
              style={{ height: "100%" }}
            >
              <div className="d-flex justify-content-between flex-column align-items-start ">
                <p
                  style={{
                    fontSize: "14px",
                    paddingLeft: "10px",
                    fontWeight: "400",
                    textAlign: "left",
                    paddingTop: "5px",
                  }}
                >
                  Traveler Class
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    paddingLeft: "10px",
                    fontWeight: "400",
                    textAlign: "left",
                    paddingTop: "0px",
                  }}
                >
                  Business
                </p>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center py-4">
                <p
                  style={{
                    fontSize: "34px",
                    paddingLeft: "0px",
                    fontWeight: "700",
                    margin: "0",
                    //   paddingTop: "10px",
                  }}
                >
                  {getTotalPeople()}
                </p>
                <p style={{ fontSize: "14px", paddingBottom: "5px" }}>
                  Traveler
                </p>
              </div>
            </div>
          </div>
          <div
            className="dropdown-menu"
            onClick={(e) => handleDropdownClick(e)}
            style={{
              backgroundColor: "white",
              padding: "8px",
              width: "250px",
            }}
          >
            {" "}
            {/* Dropdown menu */}
            <div>
              <div
                className="d-flex align-items-center justify-content-between "
                style={{ borderBottom: "1px solid #DCDCDC" }}
              >
                <div className="text-start">
                  <p style={{ fontSize: "13px", marginBottom: "0" }}>
                    Adults
                  </p>
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    12 years and above
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-around">
                  <button className="border-0 bg-white">
                    <div className="">
                      <BiMinus
                        onClick={handleAdultDecrease}
                        style={{
                          border: "1px solid #DCDCDC",
                          borderRadius: "100%",
                          fontSize: "26px",
                        }}
                      />
                    </div>
                  </button>
                  <div className="p-3">{totalAdults}</div>
                  <button className="border-0 bg-white">
                    <div className="">
                      <BiPlus
                        onClick={handleAdultIncrease}
                        style={{
                          border: "1px solid #DCDCDC",
                          borderRadius: "100%",
                          fontSize: "26px",
                        }}
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ borderBottom: "1px solid #DCDCDC" }}
                >
                  <div className="text-start">
                    <p style={{ fontSize: "13px", marginBottom: "0" }}>
                      Children
                    </p>
                    <p style={{ fontSize: "12px", color: "gray" }}>
                      2-11 Years old
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-around">
                    <button className="border-0 bg-white">
                      <div className="pa">
                        <BiMinus
                          onClick={handleChildDecrease}
                          style={{
                            border: "1px solid #DCDCDC",
                            borderRadius: "100%",
                            fontSize: "26px",
                          }}
                        />
                      </div>
                    </button>
                    <div className="p-3">{totalChildren}</div>
                    <button className="border-0 bg-white">
                      <div className="">
                        <BiPlus
                          onClick={handleChildIncrease}
                          style={{
                            border: "1px solid #DCDCDC",
                            borderRadius: "100%",
                            fontSize: "26px",
                          }}
                        />
                      </div>
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-start gap-3">
                  {childrenAges.map((age, index) => (
                    <ChildComponent
                      key={index}
                      index={index}
                      age={age}
                      onAgeChange={handleAgeChange}
                    />
                  ))}
                </div>
                <p
                  className="text-danger"
                  style={{ fontSize: "13px", textAlign: "left" }}
                >
                  Please add child age
                </p>
              </div>
              <div>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ borderBottom: "1px solid #DCDCDC" }}
                >
                  <div className="text-start">
                    <p style={{ fontSize: "13px", marginBottom: "0" }}>
                      Infant
                    </p>
                    <p style={{ fontSize: "12px" }}>Below 2 years</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-around">
                    <button className="border-0 bg-white">
                      <div className="pa">
                        <BiMinus
                          onClick={handleInfantDecrease}
                          style={{
                            border: "1px solid #DCDCDC",
                            borderRadius: "100%",
                            fontSize: "26px",
                          }}
                        />
                      </div>
                    </button>
                    <div className="p-3">{totalInfants}</div>
                    <button className="border-0 bg-white">
                      <div className="">
                        <BiPlus
                          onClick={handleInfantIncrease}
                          style={{
                            border: "1px solid #DCDCDC",
                            borderRadius: "100%",
                            fontSize: "26px",
                          }}
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ borderBottom: "1px solid #DCDCDC" }}
                >
                  <div className="text-start">
                    <p style={{ fontSize: "13px", marginBottom: "0" }}>
                      Class
                    </p>
                    <div className="d-flex align-items-center text-center gap-3">
                      <div class="form-check d-flex align-items-center gap-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="business"
                          id="business"
                        />
                        <label
                          class="form-check-label"
                          for="business"
                          style={{ fontSize: "13px" }}
                        >
                          Business
                        </label>
                      </div>
                      <div class="form-check d-flex align-items-center gap-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="economy"
                          id="economy"
                        />
                        <label
                          class="form-check-label"
                          for="economy"
                          style={{ fontSize: "13px" }}
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
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  </div>
  );
};

// Component for Flight tab
const FlightTab = () => {
  // Add your input fields for Flight here
  return (
    <div>
      <h3>Flight Tab</h3>
      {/* Add your input fields for Flight */}
    </div>
  );
};

// Component for Hotels tab
const HotelsTab = () => {
  // Add your input fields for Hotels here
  return (
    <div>
      <h3>Hotels Tab</h3>
      {/* Add your input fields for Hotels */}
    </div>
  );
};

// Component for Tour tab
const TourTab = () => {
  // Add your input fields for Tour here
  return (
    <div>
      <h3>Tour Tab</h3>
      {/* Add your input fields for Tour */}
    </div>
  );
};

export default Hotel;


const ChildComponent = ({ index, age, onAgeChange }) => {
  return (
    <div>
      <p style={{ fontSize: "10px", marginBottom: "0" }}>Child {index + 1}: </p>
      <select value={age} onChange={(e) => onAgeChange(index, e.target.value)}>
        {[...Array(11)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};
