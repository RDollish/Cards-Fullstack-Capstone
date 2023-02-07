import React, { useEffect, useState } from "react";
import { getAllOccasions } from "../../modules/occasionManager";

export const OccasionDropdown = ({ onChange }) => {
const [occasions, setOccasions] = useState([]);

useEffect(() => {
getAllOccasions().then(setOccasions);
}, []);

  const handleChange = event => {
    onChange(parseInt(event.target.value));
  };


return (
<div>
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