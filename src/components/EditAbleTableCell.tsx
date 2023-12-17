import { useState } from 'react';
import TableCell from "@mui/material/TableCell";

const EditAbleTableCell = ({ category, handleRankChange }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rankValue, setRankValue] = useState(category.rank);

  const handleEdit = () => {
    setIsEditing(true);
    setRankValue(category.rank);
  };

  const handleSave = () => {
    setIsEditing(false);
    handleRankChange(rankValue);
  };

  return (
    <TableCell align="center">
      {isEditing ? (
        <input
          type="number"
          className="input"
          value={rankValue}
          autoFocus
          onChange={(e) => setRankValue(e.target.value)}
          onBlur={handleSave}
        />
      ) : (
        <span onClick={handleEdit}>{category.rank}</span>
      )}
    </TableCell>
  );
};

export default EditAbleTableCell;
