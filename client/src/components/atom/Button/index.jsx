import React from 'react';

import './style.css';

function Button(props) {
  const { text } = props;
  return (
    <div className="btn">
      { text }
    </div>
  );
}

export default Button;