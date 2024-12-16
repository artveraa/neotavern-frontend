const placesList = [
  { name: "restaurant Français" },
  { name: "boulangerie Lyonnaise" },
  { name: "bar sans alcool" },
];
    
// cette fonction a pour but de trier les places en fonction d'une recherche par caracteres
  const filteredPlaces = (places, search) => {
    return places.filter((place) =>
       place.name.toLowerCase().includes(search.toLowerCase())
    );
  }
    
// ce test vérifie que le nom tapé correspond bien à la liste d'établissements (que ce soit en majuscule ou en minuscule)
it("la fonction filterPlaces devrait chercher correctement le lieu selon la recherche tapée", () => {
  const result = filteredPlaces(placesList, "Restaurant");
  expect(result).toEqual([{ name: "restaurant Français" }]);
});