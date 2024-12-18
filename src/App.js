import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import api from './services/api';
import { useEffect, useState, useRef } from 'react';

export default function App() {

  const [cep, setCep] = useState('');
  const input = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  function limpar() {
    setCep('');
    input.current.focus();
    setCepUser(null);

  }

  async function buscar() {
    if (cep.length < 8) {
      alert('Digite um cep válido');
      limpar();
      return;
    }
    if (cep === '') {
      alert('Digite um cep válido');
      limpar();
      return;
    }

    try {
      const response = await api.get(`${cep}/json/`);
      console.log(response.data);
      Keyboard.dismiss();
      setCepUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', width: "100%"}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput style={styles.input}
          placeholder="Ex: 79003241"
          value={cep}
          onChangeText={setCep}
          keyboardType='numeric'
          maxLength={8}
          ref={input}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.btn, {backgroundColor: '#4287f5'}, cep.length < 8 ? {opacity: 0.5, backgroundColor: '#2c3e50'} : {opacity: 1}]}
          onPress={buscar} disabled={cep.length < 8}
        >
          <Text style={styles.textBtn}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {backgroundColor: '#cd3d3d'}]}
        onPress={limpar}>
          <Text style={styles.textBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>
      { cepUser && (
      <View style={styles.resultado}>
        <Text style={styles.item}>CEP: {cepUser?.cep} </Text>
        <Text style={styles.item}>Logradouro: {cepUser?.logradouro}</Text>
        <Text style={styles.item}>Bairro: {cepUser?.bairro} </Text>
        <Text style={styles.item}>Cidade: {cepUser?.localidade}</Text>
        <Text style={styles.item}>Estado: {cepUser?.uf}</Text>
        <Text style={styles.item}>IBGE: {cepUser?.ibge}</Text>
      </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    marginTop: 25,
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 25,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 18,
    width: "90%",
  },
  areaBtn: {
    width: "90%",
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#4287f5',
  },
  textBtn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15
  },
  resultado: {
    flex: 1,
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    fontSize: 22,
    fontWeight: '400',
  }
});


//https://viacep.com.br/ws/01001000/json/