import { Pagination as MUIPagination } from "@mui/material";

export function Pagination({ cardsPerPage, totalCards, currentPage, setCurrentPage }) {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <MUIPagination
      count={Math.ceil(totalCards / cardsPerPage)}
      page={currentPage}
      onChange={handleChange}
    />
  );
}
