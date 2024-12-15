const placesList = [
  { name: "restaurant Français" },
  { name: "boulangerie Lyonnaise" },
  { name: "bar sans alcool" },
];
    
  const filteredPlaces = (places, search) => {
    return places.filter((place) =>
       place.name.toLowerCase().includes(search.toLowerCase())
    );
  }
    
it("la fonction filterPlaces devrait chercher correctement le lieu selon la recherche tapée", () => {

  const result = filteredPlaces(placesList, "Restaurant");
  expect(result).toEqual([{ name: "restaurant Français" }]);
});