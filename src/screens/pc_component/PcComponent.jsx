import React, { Suspense, useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { AppContext } from '../../App';
import AppSvg from '../../svg/AppSvg';
import { component_header, pc_components } from '../../constants';
import { GetComponent } from '../../service/route';
import { PageLoader } from '../../global_components/Loader';

export default function PcComponent() {

    // const { deviceSize } = useContext(AppContext);
    const navigation = useNavigation();
    const route = useRoute();
    const { infoData, type_component } = route.params;
    
    const [compWindow, setCompWindow] = useState(true);

    return (
        <ScrollView style={styles.container}>
            <Suspense fallback={<PageLoader />}>
                <Text style={styles.header}>{component_header[type_component]}</Text>

                <View style={styles.logoBox}>
                    <Image 
                        source={{ uri: infoData['logo'] }} 
                        style={styles.logo} 
                        defaultSource={require('../../assets/placeholder.png')}
                    />
                </View>

                <View style={styles.noteBox}>
                    {pc_components[type_component].map((item, idx) => (
                        <View key={idx} style={styles.noteItem}>
                            <Text style={styles.noteLabel}>{item['note']}</Text>
                            <Text style={styles.noteValue}>
                                {infoData[item['code_name']]}
                            </Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>
            </Suspense>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    noteBox: {
        marginBottom: 20,
    },
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    noteLabel: {
        fontSize: 16,
        color: '#666',
    },
    noteValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoBox: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    backButton: {
        backgroundColor: '#6200ee',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});