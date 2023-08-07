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

const Tour = () => {
  const [fromSelectedOption, setFromSelectedOption] = useState(null);
  const [toSelectedOption, setToSelectedOption] = useState(null);
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
    event.stopPropagation();
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
    <div className="container-fluid row">
      <div className="d-flex align-items-center justify-content-center py-4">

          <div
            className="tour-field border rounded p-2 bg-white  "
            style={{ height: "80px", minWidth:"800px" }}
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
              placeholder="Search Hotel Here"
              //   onKeyDown={(e) => handleKeyDown(e, fromAirportRef)}
              components={{
                IndicatorSeparator: () => null, // Hide the separator between the icon and value
                DropdownIndicator: () => null, // Use the icon as the dropdown indicator
              }}
              //   placeholder='Select from the list...'
            />
          </div>
     
        

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

export default Tour;

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
