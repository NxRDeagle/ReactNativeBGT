import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAssembComments, getAssembComments } from '../../services/routes';
import userAvatar from "../../img/user_avatar.jpg";
import { assembly } from '../../constants';

export default function AssemblyComments() {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const loadData = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                setUserName(parsedUser.login);
            }

            const foundComments = await getAssembComments(id);

            if (foundComments) {
                setComments(foundComments.data);
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    function handleSubmit(){

        if(!message.length){
            return;
        }

        const data = {
            assembly: id,
            user_name: username,
            text: message,
        };

        createAssembComments(data)
        .then(d => setComments([d, ...comments]))
        .finally(_ => {
            setMessage('');
        });
    }

    return (
        <View style={styles.commentsBox}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.commentsBoxCaption}>Отзывы: {comments.length} шт.</Text>
                {
                    comments.map(c => {
                        return (
                            <View key={c.id} style={styles.comment}>
                                <View style={styles.authorBox}>
                                    <Image
                                        style={styles.avatar}
                                        source={userAvatar}
                                    />
                                    <Text style={styles.nickname}>{c.user_name}</Text>
                                </View>
                                <Text style={styles.commentText}>{c.text}</Text>
                            </View>
                        );
                    })
                }
            </ScrollView>

            <View style={styles.sendComment}>
                <TextInput
                    placeholder="Оставить отзыв"
                    onChangeText={setMessage}
                    style={styles.input}
                    value={message}
                />
                <TouchableOpacity onPress={handleSubmit} style={[styles.button, !!message.length ? styles.buttonActive : {}]}>
                    <Text>Отправить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    commentsBox: {
        flex: 1,
        position: 'relative',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 20,
        paddingRight: 30,
        paddingBottom: 100,
        paddingLeft: 10,
        gap: 15,
    },
    commentsBoxCaption: {
        fontSize: 16,
        color: 'tomato',
    },
    comment: {
        backgroundColor: '#cccccc',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        maxWidth: '80%',
    },
    authorBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5,
        marginBottom: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    nickname: {
        fontSize: 14,
        color: 'black',
    },
    commentText: {
        fontSize: 12,
        color: 'black',
    },
    sendComment: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: 10,
    },
    input: {
        height: 44,
        width: '70%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        fontSize: 14,
        color: 'black',
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        height: 34,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        borderColor: 'tomato',
    },
});
