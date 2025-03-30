import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getAssemblies} from '../../services/routes';
import AssemblyBox from './components/AssemblyBox';
import FilterBox from './components/FilterBox';

// // !!! МОКОВЫЕ ДАННЫЕ. УБРАТЬ, КОГДА ПРИКРУТИМ АВТОРИЗАЦИЮ ЧТОБЫ БЭК НЕ КИДАЛ 401.
export const assembliesMockArray = [
  {
    assembly_id: 1,
    assembly_name: 'Игровая сборка PRO',
    author: 'Иван Петров',
    author_avatar: 'https://i.imgur.com/JGhvN2k.jpg',
    price: 125000,
    status: 'accepted',
    image_url:
      'https://yandex-images.clstorage.net/Ihdx48216/1965e1MGexR/Twt1OHE8v9j70PNbo_3hm-nkj1xrX-JM1Tdk7KFVlFRSApPWNE1_tIHf5XuKRYqcvDcqGNz8fTj3t9juWArpFB8IZ34leeoI-wAjSXVoZEi6twLTYRYzzhYztShv309cWYhYXO3QYKtRijLvGNcZTC1s8dzKqLcop7QeMMuY4FAPlS9iuPW02DCSecHivufGZa5HVOeT8knYNrLkLBTD0FnGFlou2-mlmoL9altZxI1sb7vNyaixqio7GvnP3WvXB9-sqr9_dF_z3b5K63XoRCwmBlCuE_fMlz6zb-hVC9dVR9UTKtVu5ZnHOaUbW0tF6eE6gs2kMOMvfNF3DlLk2IcUYu4y-7tXNx3-xiK-ocstaAXQKNC5D5n39e4qHYKamM6d1CqZ7iZTgTLkn5mHDKPhe8-O6_3o67EUcIQebZnAEe6vPD-ylnndfkKjvCnLaaFOl69StE3a8_XnqtKF3lAMWFtt2iOuU8b65VuYCoug5jcMQuT5rOrzWbfKWugQgdPr4HD_NNe1lfUDJrbsim1uwJkim7IC1Dg2b2rTRVCSyZ2UIZpvJRuBemIV1Q-KY683j4Vj-G8pdpOzT10qkAgRqi2zdz_ff1h0iej8Lw4uKo_X4105RFW3NK-tFAQQEsrV2-6SpuwVCPsnE1QDjikptw-Naz4nJvpdOQifJ1_NmOxhfDg5HrMWdckp_ywEYeXMWCYf_UpYsjtjaZYKmJqFktFlW2or30657FVUCElpJ_dERO13JSN73H-N36zUiRkt4jf_NBj-l37NJDLgBCKnRZZq2rMJ1rq_pOBTyZ6VTR-T5J8nIVaIfGqS1csEpOb7CEGlcWIqv9D_zp6sHoLZo6E18vaUsxw-DWG0oQsjrsgZINsxDhjy9CjgmwRc145Q0uZYKeLZT_gvEBxLAujpuIyLb75nYDPcOIAcLxsA26-gND06GTPXtAihPKdC7aJOW-fd-UVQ-zOkaE',
    likes: [1, 3, 5],
    components: [
      {
        type: 'cpu',
        id: 101,
        name: 'Intel Core i9-13900K',
        logo: 'https://i.imgur.com/5EJFZ1t.png',
        price: 45000,
        status: 'accepted',
      },
      {
        type: 'gpu',
        id: 201,
        name: 'NVIDIA RTX 4090',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 150000,
        status: 'accepted',
      },
      {
        type: 'ram',
        id: 301,
        name: 'Kingston Fury 64GB DDR5',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 12000,
        status: 'accepted',
      },
      {
        type: 'motherboard',
        id: 401,
        name: 'ASUS ROG Maximus Z790',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 35000,
        status: 'accepted',
      },
      {
        type: 'hull',
        id: 501,
        name: 'NZXT H7 Elite',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 15000,
        status: 'accepted',
      },
      {
        type: 'hard-disk',
        id: 601,
        name: 'Samsung 980 Pro 1TB',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 10000,
        status: 'accepted',
      },
      {
        type: 'power-supply',
        id: 701,
        name: 'Corsair RM1000x',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 18000,
        status: 'accepted',
      },
      {
        type: 'cooler',
        id: 801,
        name: 'Noctua NH-D15',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 10000,
        status: 'accepted',
      },
    ],
  },
  {
    assembly_id: 2,
    assembly_name: 'Бюджетная сборка',
    author: 'Алексей Смирнов',
    author_avatar: 'https://i.imgur.com/l3Z0TQc.jpg',
    price: 45000,
    status: 'accepted',
    image_url:
      'https://avatars.mds.yandex.net/get-ydo/3912055/2a00000182bbcd85cf4bf0aa118cb7fba447/diploma',
    likes: [2, 4],
    components: [
      {
        type: 'cpu',
        id: 102,
        name: 'AMD Ryzen 5 5600X',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 18000,
        status: 'accepted',
      },
      {
        type: 'gpu',
        id: 202,
        name: 'NVIDIA RTX 3060',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 35000,
        status: 'accepted',
      },
      {
        type: 'ram',
        id: 302,
        name: 'Crucial 16GB DDR4',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 5000,
        status: 'accepted',
      },
      {
        type: 'motherboard',
        id: 402,
        name: 'MSI B550-A PRO',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 12000,
        status: 'accepted',
      },
      {
        type: 'hull',
        id: 502,
        name: 'Deepcool MATREXX 55',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 5000,
        status: 'accepted',
      },
      {
        type: 'hard-disk',
        id: 602,
        name: 'Kingston A400 480GB',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 3000,
        status: 'accepted',
      },
      {
        type: 'power-supply',
        id: 702,
        name: 'AeroCool Lux 650W',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 4000,
        status: 'accepted',
      },
      {
        type: 'cooler',
        id: 802,
        name: 'AMD Wraith Stealth',
        logo: 'https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1',
        price: 0,
        status: 'accepted',
      },
    ],
  },
];

export const assemblyMock = assembliesMockArray[0];

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [assembliesInfo, setAssembliesInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setNickname(JSON.parse(user)?.nickname);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchAssemblies = async () => {
      setLoading(true);
      try {
        const urlGetSearch = `?type=${route.params?.type || ''}&filter=${
          activeFilter || ''
        }&nickname=${nickname || ''}`;
        // !!! TODO
        // const response = await getAssemblies(urlGetSearch);
        setAssembliesInfo(assembliesMockArray);
        // setAssembliesInfo(response.data || []);
      } catch (error) {
        console.error('Error fetching assemblies:', error);
        setAssembliesInfo([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssemblies();
  }, [activeFilter, route.params?.type, nickname]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {!route.params?.type && (
          <FilterBox
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}

        {loading ? (
          <View style={styles.loaderContainer}>
            <Text>Загрузка...</Text>
          </View>
        ) : (
          <>
            {assembliesInfo.length > 0 ? (
              assembliesInfo.map(assembly => (
                <AssemblyBox
                  key={assembly.assembly_id}
                  assemblyInfo={assembly}
                />
              ))
            ) : (
              <Text style={styles.notFound}>Сборки не найдены :(</Text>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  notFound: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
