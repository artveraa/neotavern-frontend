// cet input reçoit un mot de passe
        <TextInput
          secureTextEntry={true}
          placeholder="Mot de passe"
          onChangeText={(value) => setPass(value)}
          value={pass}
          style={styles.input}
          testID="passwordInput"
        />

// Les inputs mots de passes ont une sécurité assurant que le texte est masqué dans l'interface utilisateur
it(`Les inputs mots de passes ont une sécurité assurant que le texte est masqué dans l'interface utilisateur`, () => {
  const passwordInput = screen.getByTestId('passwordInput');
  // Vérifier que secureTextEntry est bien à true
  expect(passwordInput.secureTextEntry).toBe(true);
});