import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {assembLike} from '../../../service/route';
import AppSvg from '../../../svg/AppSvg';

const DEFAULT_PC_IMAGE =
  'https://yandex-images.clstorage.net/u9HEE7417/c8c70dgi5/Rz7_IbOVXzhdk65KbGtKJtn06Z8eUp20Q2zV8ekz-nHaRv_cCqkhYvBFnZeQ5lebfTVanz2gxG2ZjIj1m5oA1CYnsij2nCYkXYf_ZkVbIhaZodnqEgeV0FNxscH4nx-pTtdWONdQ8KZRbYGqxat-rzwFrnd9LJTgYTnYbaevFQFvji_R71nKIFnHy6I4a2aeXaV1Z6IvRQ0X-JhcDGeL-XJDZuCzeKROyUk1-m2bK7c8QWY6tRDkWPUpXLFPB-khzw6zRbtR2lit2_dOWEPiioklFcMqw7XZc8DIgGyzh-3yZ86cPygwpt3ZpdLBowMbuN2KQjX8eLCpAfT5-_MZqduyL7F74aZAdaOL_gS37lLFgV2vMrdhXYtMUGCUw7dhQmu-mNscSM5NbaHenYOHc-BpBsq1lPyUUWlo9SeD-VXT0rd1h72mYD0_q5LEt9IihbVtw56raYXbRJAU4FdzjWb3rkjP7Eyu4TENBkHbT4u0NdbidXAMsE0R4OG3n2kB58bHLe8NRrBl53NegGt6uqmhfcNur-VZO0TUoKjXCylWE3rgE8yIzuVhVYLthyufrE2W6mmUZPzZKZwd4wupDdfqw6FrnYoUoSv3Gjw3WmJ1vRl7tk8VqTd0hFB09_MRDktO3P_41DrhydWqFZM_A2Q1itI9hIC8ZW0Qpe8TabFvxifRgxWK2HXnu0bcf-reFalF66rHHQ1_rFTYfF87ua43ZiSbfFi6JR2pjpUr9yMkQYqSIQQIVI0p3PH7g_ldT-p_xb-V8gipq0OqaFemosF17avCMxXBEwx0KKDPs4neSwowF6hQqrUlSZqBg__34FUyHvF01MhJUYBxA-MpPQd-d-HfBapMDZN3vuArZhYp_QXDlsMViRdc9LAQA3upfmO-oN-cMJK1GZH68ZdT10gZ-uI9fGBUFS1Q3U-z6T2r1sOxA7U6SDkHO3bcW-LWedE5c-qf8blzUOAMdPe4';

export default function AssemblyBox({assemblyInfo}) {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);

  useEffect(() => {
    const checkLike = async () => {
      const user = await AsyncStorage.getItem('user');
      const userId = user ? JSON.parse(user).id : null;
      setLike(assemblyInfo.likes.includes(userId));
      setCountLike(assemblyInfo.likes.length);
    };
    checkLike();
  }, [assemblyInfo.likes]);

  const handleLike = async () => {
    const user = await AsyncStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    if (!userId) return;

    const data = {
      user_id: userId,
      assembly_id: assemblyInfo.assembly_id,
    };

    try {
      const response = await assembLike(data);
      setLike(response.like);
      setCountLike(prev => (response.like ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const goToAssembly = () => {
    navigation.navigate('Assembly', {id: assemblyInfo.assembly_id});
  };

  return (
    <View style={styles.assemblyBox}>
      <View style={styles.logoBox}>
        <Image
          source={{uri: assemblyInfo?.image_url ?? DEFAULT_PC_IMAGE}}
          style={styles.assemblyImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.assemblyName}>
          Название сборки: {assemblyInfo.assembly_name}
        </Text>
        <Text style={styles.assemblyAuthor}>
          Автор сборки: {assemblyInfo.author}
        </Text>

        {assemblyInfo.components?.map((component, index) => (
          <Text key={index} style={styles.componentItem}>
            * {component.type}: {component.name}
          </Text>
        ))}
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.price}>{assemblyInfo.price} Руб.</Text>

        <TouchableOpacity onPress={goToAssembly} style={styles.detailsButton}>
          <Text style={styles.buttonText}>Подробнее о сборке</Text>
        </TouchableOpacity>

        <View style={styles.likeContainer}>
          <Text style={styles.likeCount}>{countLike}</Text>
          <TouchableOpacity onPress={handleLike}>
            <AppSvg
              type={like ? 'like-filled' : 'like'}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assemblyBox: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoBox: {
    width: '100%',
    height: 200,
  },
  assemblyImage: {
    width: '100%',
    height: '100%',
  },
  infoBox: {
    padding: 16,
  },
  assemblyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  assemblyAuthor: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  componentItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: 'tomato',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    marginRight: 8,
    fontSize: 16,
  },
  likeIcon: {
    width: 24,
    height: 24,
  },
});
