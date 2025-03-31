import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import AppSvg from '../../svg/AppSvg';
import ReactNativeBiometrics from 'react-native-biometrics';
import { CreateUser } from '../../services/routes';

const RegistrationScreen = () => {

    const [login, setLogin] = useState('');
    const [pswd, setPswd] = useState('');
    const [pswdVisible, setPswdVisible] = useState(false);
    const [error, setError] = useState('');
    const [biometric, setBiometric] = useState(null);
    const [isBiometric, setIsBiometric] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkBiometric = async () => {
        //Проверяем что биометрия доступна
        const rnBio = new ReactNativeBiometrics();
        const { avaible } = await rnBio.isSensorAvailable();
        setIsBiometric(avaible);
    };

    //Юс эффект для проверки биометрии
    useEffect(() => {
        checkBiometric();
    }, []);

    //Функция создания биометрии
    async function handleBio() {
        const rnBio = new ReactNativeBiometrics();
        setIsLoading(true);
        try {
            // 1. Генерируем ключи
            const { publicKey } = await rnBio.createKeys();
            // 2. Запоминаем его
            setBiometric(publicKey);
        } catch (e) {
            setError('Ошибка создани биометрики');
        } finally {
            setIsLoading(false);
        }
    }

    //Функция отправки данных на сервер
    function handleSubmit() {
        const data = {
            login: login,
            password: pswd,
            public_key: biometric,
        };
        setIsLoading(true);
        CreateUser(data)
            .then(d => Alert("Кайфы"))
            .catch(e => setError(e))
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <ImageBackground
            source={require('../../img/background.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.form}>
                <Text style={styles.caption}>Регистрация</Text>
                <View style={styles.inputField}>
                    <TextInput
                        style={styles.input}
                        value={login}
                        onChangeText={setLogin}
                        placeholder="Логин"
                        placeholderTextColor="#666"
                    />
                    <AppSvg style={styles.icon} viewH={512} viewW={512} type="login" />
                </View>
                <View style={styles.inputField}>
                    <TextInput
                        style={styles.input}
                        value={pswd}
                        placeholder="Пароль"
                        onChangeText={setPswd}
                        placeholderTextColor="#666"
                        secureTextEntry={pswdVisible ? false : true}
                    />
                    {
                        pswdVisible ? <AppSvg onClick={() => setPswdVisible(false)} style={styles.icon} viewH={64} viewW={64} type="pswd-visible" /> : <AppSvg onClick={() => setPswdVisible(true)} style={styles.icon} viewH={121} viewW={121} type="pswd-not-visible" />
                    }
                </View>
                {
                    !!error.length && <Text style={styles.error}>{error}</Text>
                }
                {
                    isLoading ?
                        <Text>Загрузка...</Text>
                        :
                        <>
                            <View style={styles.buttonBox}>
                                {
                                    isBiometric &&
                                    <TouchableOpacity onPress={handleBio} style={[styles.button1, biometric ? styles.activeButton : {}]}>
                                        <Text style={styles.button1Text}>Touch/Face ID</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={handleSubmit} style={styles.button2}>
                                    <Text style={styles.button2Text}>Зарегистрироваться</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }
                <TouchableOpacity>
                    <Text>Есть аккаунт ? Войти</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 14,
        color: 'red',
    },
    form: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        paddingVertical: 10,
        alignItems: 'center',
        gap: 20,
    },
    caption: {
        fontSize: 20,
        color: 'black',
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: '90%',
        height: 44,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#666',
    },
    input: {
        width: '80%',
        fontSize: 14,
        color: 'black',
    },
    icon: {
        width: 20,
        height: 20,
        fill: 'black',
    },
    buttonBox: {
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 10,
    },
    button1: {
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#00BFFF',
    },
    activeButton: {
        borderColor: 'green',
        backgroundColor: 'green',
    },
    button1Text: {
        fontSize: 13,
        color: 'black',
    },
    button2: {
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'tomato',
        backgroundColor: 'tomato',
    },
    button2Text: {
        fontSize: 13,
        color: 'white',
    },
});

export default RegistrationScreen;