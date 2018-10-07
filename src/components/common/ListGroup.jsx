import React from 'react';
const ListGroup = props => {
  const {
    selectedItem,
    textProperty,
    valueProperty,
    items,
    onItemSelect
  } = props;
  console.log(items);
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={{ cursor: 'pointer' }}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;
