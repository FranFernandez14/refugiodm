import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ selectedDate, onChange, placeholderText }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      selectsStart
      startDate={selectedDate}
      endDate={selectedDate}
      dateFormat="yyyy-MM-dd"
      placeholderText={placeholderText}
    />
  );
};

export default CustomDatePicker;
