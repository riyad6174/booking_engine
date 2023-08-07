import React, { useEffect, useRef, useState } from 'react';

const ChildComponent = ({ index, age, onAgeChange }) => {
  return (
    <div>
      Child {index + 1}:{' '}
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

const App = () => {
  const [totalChildren, setTotalChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalAdults, setTotalAdults] = useState(0);
  const [totalInfants, setTotalInfants] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

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

  const Popup = ({ onClose }) => {
    return (
      <div className='popup'>
        <span className='close-btn' onClick={onClose}>
          &times;
        </span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          dicta dolores facilis ducimus, optio voluptatum deleniti tempora
          deserunt corporis maiores, fuga cumque molestias. Tempora reiciendis
          fugit molestias quaerat itaque explicabo..
        </p>
      </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handleCloseClick = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <h2>Total Children: {totalChildren}</h2>
      <button onClick={handleChildIncrease}>Add Child</button>
      <button onClick={handleChildDecrease}>Remove Child</button>

      <h2>Total Adults: {totalAdults}</h2>
      <button onClick={handleAdultIncrease}>Add Adult</button>
      <button onClick={handleAdultDecrease}>Remove Adult</button>

      <h2>Total Infants: {totalInfants}</h2>
      <button onClick={handleInfantIncrease}>Add Infant</button>
      <button onClick={handleInfantDecrease}>Remove Infant</button>

      <h2>Total People: {getTotalPeople()}</h2>

      {childrenAges.map((age, index) => (
        <ChildComponent
          key={index}
          index={index}
          age={age}
          onAgeChange={handleAgeChange}
        />
      ))}

      <div>
        <button onClick={handleButtonClick}>Open Popup</button>
        {isPopupVisible && (
          <div className='overlay'>
            <div className='popup-container' ref={popupRef}>
              <Popup onClose={handleCloseClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
