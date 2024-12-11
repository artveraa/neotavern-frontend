import React from "react";
import { Text } from "react-native";

const TextApp= ({children}) => {
    return (
        <Text style={{color:'#333333', fontFamily:'Lexend_300Light'}}>{children}</Text>
    );
  };
  
export default TextApp

