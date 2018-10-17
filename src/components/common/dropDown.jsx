import React, { Component } from 'react';
const Dropdown = ({ name, label, list, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name}>
        {list.map(item => (
          <option key={item._id}>{item.name}</option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Dropdown;
