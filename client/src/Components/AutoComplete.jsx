import React from 'react';
import Select from 'react-select';

const Autocomplete = ({ suggestions, value, onChange }) => {
  const options = suggestions.map(suggestion => ({
    value: suggestion,
    label: suggestion,
  }));

  const handleChange = selectedOption => {
    onChange(selectedOption ? selectedOption.value : '');
  };

  return (
    <Select
  options={options}
  value={options.find(option => option.value === value)}
  onChange={handleChange}
  placeholder="Search for locations..."
  isClearable
  isSearchable
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black'
    })
  }}
/>
  );
};

export default Autocomplete;
