import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Pacote para menu suspenso
import axios from 'axios'; // Opcional, para chamada de API

export default function App() {
    const [selectedValue, setSelectedValue] = useState('option1'); // Para o menu
    const [data, setData] = useState(null); // Armazenar dado da API

    // Função para buscar dados da API
    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1'); //teste com API pública de exemplo
            setData(response.data.title);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Chama a API quando o app é carregado
    }, []);

    return (
        <View style={styles.container}>
            {/* Exibir Imagem */}
            <Image
                source={{ uri: 'https://via.placeholder.com/200' }}
                style={styles.image}
            />

            {/* Exibir Dado da API */}
            <Text style={styles.text}>Dado da API: {data ? data : 'Carregando...'}</Text>

            {/* Botão */}
            <TouchableOpacity style={styles.button} onPress={() => alert('Botão pressionado!')}>
                <Text style={styles.buttonText}>Pressione</Text>
            </TouchableOpacity>

            {/* Menu suspenso */}
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Opção 1" value="option1" />
                <Picker.Item label="Opção 2" value="option2" />
                <Picker.Item label="Opção 3" value="option3" />
            </Picker>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff', // Linha da imagem
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: 150,
    },
});