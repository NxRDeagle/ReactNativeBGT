import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import AppSvg from '../../svg/AppSvg';
import ReactNativeBiometrics from 'react-native-biometrics';
import { AuthUser, CreateUser } from '../../services/routes';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [login, setLogin] = useState('');
    const [pswd, setPswd] = useState('');
    const [pswdVisible, setPswdVisible] = useState(false);
    const [error, setError] = useState('');
    const [isBiometric, setIsBiometric] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkBiometric = async () => {
        //Проверяем что биометрия доступна
        const rnBio = new ReactNativeBiometrics();
        const { available } = await rnBio.isSensorAvailable();
        setIsBiometric(available);
    };

    //Юс эффект для проверки биометрии
    useEffect(() => {
        checkBiometric();
    }, []);

    //Функция создания биометрии
    async function handleBio() {
        setError('');
        const rnBio = new ReactNativeBiometrics();
        setIsLoading(true);

        try {
            const { success, signature } = await rnBio.createSignature({
                promptMessage: 'Вход с биометрией',
                payload: login,
            });

            if (!success) { throw new Error(''); }

            const data = {
                login: login,
                password: pswd,
                public_key: signature,
            };

            AuthUser(data)
                .then(() => navigation.navigate('MainTabs'))
                .catch(e => setError(e))
                .finally(() => setIsLoading(false));

        } catch (e) {
            setError('Ошибка в биометрических данных');
        } finally {
            setIsLoading(false);
        }
    }

    //Функция отправки данных на сервер
    function handleSubmit() {
        setError('');
        const data = {
            login: login,
            password: pswd,
            public_key: '',
        };
        setIsLoading(true);
        AuthUser(data)
            .then(() => navigation.navigate('MainTabs'))
            .catch(e => setError(e))
            .finally(() => setIsLoading(false));
    }

    return (
        <ImageBackground
            source={require('../../img/background.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.form}>
                <Text style={styles.caption}>Авторизация</Text>
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
                                    isBiometric && !!login.length &&
                                    <TouchableOpacity onPress={handleBio} style={styles.button1}>
                                        <Text style={styles.button1Text}>Touch/Face ID</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={handleSubmit} style={styles.button2}>
                                    <Text style={styles.button2Text}>Войти</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }
                <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                    <Text>Нет аккаунта? Создать</Text>
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

export default LoginScreen;