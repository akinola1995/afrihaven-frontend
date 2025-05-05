import React, { useState, useEffect } from 'react';

const statesCities = {
  Lagos: ['Ikeja', 'Lekki', 'Yaba', 'Surulere', 'Ikorodu'],
  Abuja: ['Maitama', 'Wuse', 'Garki', 'Gwarinpa', 'Asokoro'],
  Kano: ['Nassarawa', 'Tarauni', 'Fagge', 'Gwale', 'Kumbotso'],
  Rivers: ['Port Harcourt', 'Obio-Akpor', 'Bonny', 'Oyigbo', 'Eleme']
};

function StateCityDropdown({ onStateChange, onCityChange }) {
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (selectedState && statesCities[selectedState]) {
      setCities(statesCities[selectedState]);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  return (
    <div className="space-y-4">
      <select
        className="border p-2 w-full"
        onChange={(e) => {
          const state = e.target.value;
          setSelectedState(state);
          onStateChange(state);
        }}
      >
        <option value="">Select State</option>
        {Object.keys(statesCities).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select className="border p-2 w-full" onChange={(e) => onCityChange(e.target.value)}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StateCityDropdown;
