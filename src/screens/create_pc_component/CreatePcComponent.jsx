import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../global-components/Loader';
import { useState } from 'react';
import { create_component, component_logo } from '../../constants';
import { postComponent } from '../../services/routes';

export default function CreatePcComponent() {

    const navigation = useNavigation();
    const route = useRoute();
    const { type } = route.params;

    const obj = Object.keys(create_component[type])
        .filter(item => item !== 'head')
        .reduce((item, key) => {
            item[key] = '';
            return item;
        }, {});

    const [createComponentState, setCreateComponentState] = useState({
        ...obj,
    });
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    const handleChangeInput = (name, value) => {
        setCreateComponentState({
            ...createComponentState,
            [name]: value,
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setLoad(true);
        postComponent(type, { ...createComponentState, logo: component_logo[type], status: 'confirmation' })
            .then(_ => navigation.goBack())
            .catch(e => setError(e))
            .finally(_ => {
                setLoad(false);
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.name}>{create_component[type].head}</Text>
            {
                Object.keys(create_component[type])
                    .filter(item => item !== 'head')
                    .map((item, idx) => {
                        return (
                            <View key={`create-comp-${idx}`} style={styles.inputBox}>
                                <Text style={styles.label}>{create_component[type][item].label}</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={createComponentState[item]}
                                    onChangeText={(text) => handleChangeInput(item, text)}
                                />
                                {
                                    create_component[type][item].note && <Text style={styles.note}>{create_component[type][item].note}</Text>
                                }
                            </View>
                        )
                    })
            }
            <TouchableOpacity
                style={styles.saveButton}
                onPress={e => handleSubmit(e)}
                disabled={load}
            >
                {load ? (
                    <Loader size="small" color="#fff" />
                ) : (
                    <Text style={styles.saveButtonText}>Сохранить комплектующее</Text>
                )}
            </TouchableOpacity>
            {
                !!error.length && <Text style={styles.error}>{error}</Text>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        gap: 30,
        padding: 40,
    },
    name: {
        alignSelf: 'center',
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },
    inputBox: {
        flexDirection: 'column',
        gap: 5,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
    note: {
        fontSize: 14,
        color: 'tomato',
        textAlign: 'center',
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    textInput: {
        height: 42,
        width: '90%',
        borderRadius: 10,
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#dddd',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        fontSize: 14,
        color: 'red',
        alignSelf: 'center',
    },
});