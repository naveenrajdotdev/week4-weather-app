export const storage = {
  getCity() {
    return localStorage.getItem("city") || "Chennai";
  },
  setCity(city) {
    localStorage.setItem("city", city);
  }
};