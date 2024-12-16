import { render, fireEvent } from "@testing-library/react-native";
import AddEventScreen from "../screens/AddEventScreen";

describe("AddEventScreen", () => {
  it("ajoute et retire un type d'événement sélectionné", () => {
    // Rendre le composant
    const { getByText } = render(<AddEventScreen />);

    // Sélectionner le bouton pour un type d'événement spécifique, par exemple "Concert"
    const concertButton = getByText("Concert");

    // Cliquer sur le bouton pour ajouter le type
    fireEvent.press(concertButton);

    // Vérifier que le bouton est marqué comme sélectionné
    expect(concertButton.parent.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: "#EDA0FF" })
    );

    // Cliquer à nouveau pour retirer le type
    fireEvent.press(concertButton);

    // Vérifier que le bouton n'est plus sélectionné
    expect(concertButton.parent.props.style).not.toContainEqual(
      expect.objectContaining({ backgroundColor: "#EDA0FF" })
    );
  });
});
