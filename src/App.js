import "./App.css";
import { BrowserRouter, Route, Router } from "react-router-dom";
import CustomSearchableDropdown from "./pages/booking";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Book from "./components/Booking/Book";
import { useState } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { GiPalmTree } from "react-icons/gi";
import { MdFlightTakeoff } from "react-icons/md";
import Tour from "./components/Booking/Tour";
import Hotel from "./components/Booking/Hotel";
function App() {
  const [activeTab, setActiveTab] = useState("flight");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
        {/* <!-- Navbar --> */}
  <nav class="navbar navbar-expand-lg navbar-dark d-none d-lg-block" style={{zIndex: "2000"}}>
    <div class="container-fluid">
      {/* <!-- Navbar brand --> */}
      <a class="navbar-brand nav-link" target="_blank" href="#">
        <strong>MDB</strong>
      </a>
      <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
        aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active ">
            <a class="nav-link" aria-current="page" href="#intro">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" rel="nofollow"
              target="_blank">Learn Bootstrap 5</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://mdbootstrap.com/docs/standard/" target="_blank">Download MDB UI KIT</a>
          </li>
        </ul>

        <ul class="navbar-nav list-inline">
          {/* <!-- Icons --> */}
          <li class="">
            <a class="nav-link" href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA" rel="nofollow"
              target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
          </li>
          <li class="">
            <a class="nav-link" href="https://www.facebook.com/mdbootstrap" rel="nofollow" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://twitter.com/MDBootstrap" rel="nofollow" target="_blank">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/mdbootstrap/mdb-ui-kit" rel="nofollow" target="_blank">
              <i class="fab fa-github"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

        <div
          className="d-flex align-items-center justify-content-center booking-wrapper"
          style={{ backgroundColor: "#DCDCDC", height: "80vh" }}
        >
          <div
            className="d-flex flex-column align-items-center justify-content-center bg-white rounded"
            style={{
              border: "2px solid white",
              padding: "20px 0px",
              position: "relative",
            }}
          >
            {/* Tabs */}
            <div
              className="d-flex align-items-center justify-content-center gap-5 p-2 rounded"
              style={{
                border: "1px solid #DCDCDC",
                backgroundColor: "white",
                position: "absolute",
                top: "-25px",
                zIndex: "9999",
              }}
            >
              <button
                className="border-0"
                onClick={() => handleTabChange("flight")}
              >
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  <MdFlightTakeoff />
                  Flight
                </div>
              </button>
              <button
                className="border-0"
                onClick={() => handleTabChange("hotels")}
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                <BiBuildingHouse />
                Hotels
              </button>
              <button
                className="border-0"
                onClick={() => handleTabChange("tour")}
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                <GiPalmTree />
                Tour
              </button>
            </div>
            <div className="d-flex align-items-center justify-content-center tab-height">
              {/* Display tab content based on the active tab */}
              {activeTab === "flight" && <FlightTab />}
              {activeTab === "hotels" && <HotelsTab />}
              {activeTab === "tour" && <TourTab />}
            </div>

            {/* ... (Rest of the code) */}
            <div className="" style={{ position: "absolute", bottom: "-20px" }}>
              <button
                className="border border-warning rounded"
                style={{
                  border: "2px solid black",

                  padding: "10px",
                  backgroundColor: "#fccd03",
                  width: "150px",
                  fontSize: "18px",
                  fontWeight: "350",
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

export default App;

const FlightTab = () => {
  // Add your input fields for Flight here
  return (
    <div className="d-flex align-items-center justify-content-center mx-4">
      <Book />
    </div>
  );
};

// Component for Hotels tab
const HotelsTab = () => {
  // Add your input fields for Hotels here
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Hotel />
      {/* Add your input fields for Hotels */}
    </div>
  );
};

// Component for Tour tab
const TourTab = () => {
  // Add your input fields for Tour here
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Tour />
      {/* Add your input fields for Tour */}
    </div>
  );
};
