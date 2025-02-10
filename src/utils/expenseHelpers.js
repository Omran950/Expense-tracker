// Apply category and search filters
export const applyFilters = (data, category, searchTerm) => {
  let filteredData = [...data];
  if (category && category !== "all") {
    filteredData = filteredData.filter((item) => item.category === category);
  }
  if (searchTerm) {
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
  return filteredData;
};

// Sort items based on field and direction
export const sortItems = (items, field, direction) => {
  return [...items].sort((a, b) => {
    let comparison = 0;
    if (field === "amount") {
      comparison = Number(a[field]) - Number(b[field]);
    } else {
      comparison = a[field].localeCompare(b[field]);
    }
    return direction === "asc" ? comparison : -comparison;
  });
};
