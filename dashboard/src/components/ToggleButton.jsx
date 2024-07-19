import React, { useState } from 'react';

const ToggleButton = ({ initialState = false, onToggle }) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    if (onToggle) {
      onToggle(newToggleState);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-lg ${
        isToggled ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
      }`}
    >
      {isToggled ? 'On' : 'Off'}
    </button>
  );
};

export default ToggleButton;