import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

// bcs this only needed to run once no matter what, just put it here (outside the component)
// and also, use this for the initial state value
// unnecessary to runs this every time in useEffect, 
// also since this does not deal with any callback from APIs (promise, async calls, etc. stuff like that)
// the code to make the selected places persistent even after reloading
// get the data from local storage
const currSelectedPlacesIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

// try to get every id's place object from AVAILABLE_PLACES
const fetchedSelectedPlaces = currSelectedPlacesIds.map((id) => {
  return AVAILABLE_PLACES.find((place) => place.id === id);
});

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(fetchedSelectedPlaces);

  // so, useEffect takes two argument
  // 1. Function to be executed, 
  // 2. the dependencies (specifying when one of the elements changed, the function from 1 will execute again)
  // if there is no number 2, state update will cause inifinite loop (BAD)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES, 
        position.coords.latitude,
        position.coords.longitude
      );
  
      setAvailablePlaces(sortedPlaces);
    });  
  }, []);

  // this will be executed, and a state will be updated
  // causing this component to be re-rendered
  // after re-render happen, this will be executed again, and a state will be updated again
  // causing this component to be re-rendered again as well.
  // This will cause a rendering inifinite loop, AND IT IS DEF BAD< A PROBLEM FOR SURE

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      console.log(place);
      return [place, ...prevPickedPlaces];
    });
    
    // make the selected places to be persistent
    // use the local storage
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    
    // if the currently selected place is not in the array of selected places
    // put it in the array in the local storage
    // else, don't
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }

    // NOTE: one way to add an item to local storage
    // put: make it as a JSON and use .stringify to save it in local storage
    // get: use .parse
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    // remove the item in the list in localStorage as well
    const newStoredIds = JSON.parse(localStorage.getItem('selectedPlaces')).filter((id) => id !== selectedPlace.current );
    localStorage.setItem('selectedPlaces', JSON.stringify(newStoredIds));
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
