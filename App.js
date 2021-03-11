import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"
import axios from 'axios';

const App = () => {
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ( async () => {
      await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then((res) => {
          let sort = res.data.sort(function (x, y) {
            return x.nome.localeCompare(y.nome)
          })
          setEstados(sort)
          setLoading(true)
      })
    } )()
  }, [])

  useEffect(() => {
    ( async () => {
      await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then((res) => {
          let sort = res.data.sort(function (x, y) {
            return x.nome.localeCompare(y.nome)
          })
          setCidades(sort)
      })
    } )()
  }, [selectedUf])

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedUf}
        style={{ height: 50, width: 150, color: "#05375a" }}
        onValueChange={(itemValue, itemIndex) => setSelectedUf(itemValue)}
      >
      <Picker.Item label="Selecione" value="" />
      { 
        loading && 
        estados.map((estado, index) => {
          return <Picker.Item key={ index } label={ estado.nome } value={ estado.sigla } />
        }) 
      }
      </Picker>

      <Picker
        selectedValue={selectedCity}
        style={{ marginTop: 100, height: 50, width: 150, color: "#05375a" }}
        onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
      >
      { 
        loading && 
        cidades.map((cidade, index) => {
          return <Picker.Item key={ index } label={ cidade.nome } value={ cidade.sigla } />
        }) 
      }
      </Picker>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default App;