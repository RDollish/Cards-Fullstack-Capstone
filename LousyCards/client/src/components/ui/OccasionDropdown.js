import React, { useEffect, useState } from "react";
import { getAllOccasions } from "../../modules/occasionManager";
import './OccasionDropdown.css'

export const OccasionDropdown = ({ onChange, setCurrentPage }) => {
const [occasions, setOccasions] = useState([]);

useEffect(() => {
getAllOccasions().then(setOccasions);
}, []);

  const handleChange = event => {
    setCurrentPage(1);
    onChange(parseInt(event.target.value));
  };


return (
<div className="Occasion-Dropdown">
  <label>Filter by:</label>
<select onChange={handleChange}>
<option value="">All Occasions</option>
{occasions.map(occasion => (
<option key={occasion.id} value={occasion.id}>
{occasion.name}
</option>
))}
</select>
</div>
);
};