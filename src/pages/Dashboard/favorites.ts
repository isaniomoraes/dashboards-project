// Store starred dashboards in localStorage
// Recommended to use a real API to store it in a database

// Load starred dashboards from localStorage
export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

// Add a dashboard to favorites
export const addFavorite = (dashboardId: string) => {
  const favorites = getFavorites();
  // Check if dashboard is already in favorites
  if (favorites.includes(dashboardId)) return;
  // Add dashboard to favorites
  favorites.push(dashboardId);
  // Save favorites to localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Remove a dashboard from favorites
export const removeFavorite = (dashboardId: string) => {
  const favorites = getFavorites();
  // Check if dashboard is already in favorites
  if (!favorites.includes(dashboardId)) return;
  // Remove dashboard from favorites
  const filteredFavorites = favorites.filter(
    (favorite: string) => favorite !== dashboardId
  );
  // Save favorites to localStorage
  localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
};
