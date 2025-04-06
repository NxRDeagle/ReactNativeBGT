import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {component_status, add_component_head} from '../../constants';
import {getAddComponents, addAssembly} from '../../services/routes';
import ComponentStatusBox from './components/ComponentStatusBox';
import AddComponent from './components/AddComponent';
import SaveAssembly from './components/SaveAssembly';

/**
 * Экран создания сборки ПК
 * Позволяет последовательно добавлять компоненты и проверять их совместимость
 */
export default function CreateAssemblyScreen({navigation}) {
  const [load, setLoad] = useState(false);
  const [searchComponents, setSearchComponents] = useState([]);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');
  const [componentIdx, setComponentIdx] = useState(0);
  const [errorComponent, setErrorComponent] = useState({
    hull: [],
    motherboard: [],
    cpu: [],
    cooler: [],
    ram: [],
    gpu: [],
    hard_disk: [],
    power_supply: [],
  });
  const [componentsInfo, setComponentsInfo] = useState([]);
  const [checkInfo, setCheckInfo] = useState({
    hull: {
      form_factor: null,
      slots_count: null,
      max_length_gpu: null,
      max_height_culler: null,
    },
    motherboard: {
      socket: null,
      type_ram: null,
      memory_frequency_specification: null,
      maximum_memory_size: null,
      all_slots: null,
    },
    cpu: {
      max_heat_generation: null,
      type_rams: null,
      maximum_memory_size: null,
    },
    cooler: {
      max_heat_generation: null,
      all_socket: null,
      power_consumption: null,
    },
    ram: [],
    gpu: [],
    hard_disk: [],
    power_supply: {},
  });

  // Загрузка сохраненного состояния
  useEffect(() => {
    const loadState = async () => {
      try {
        const [idx, error, assemblyInfo, checkInfo] = await Promise.all([
          AsyncStorage.getItem('idx'),
          AsyncStorage.getItem('error'),
          AsyncStorage.getItem('assemblyInfo'),
          AsyncStorage.getItem('checkInfo'),
        ]);

        if (idx) setComponentIdx(JSON.parse(idx));
        if (error) setErrorComponent(JSON.parse(error));
        if (assemblyInfo) setComponentsInfo(JSON.parse(assemblyInfo));
        if (checkInfo) setCheckInfo(JSON.parse(checkInfo));
      } catch (e) {
        console.error('Ошибка загрузки состояния:', e);
      }
    };

    loadState();
  }, []);

  /**
   * Отправка сборки на сервер
   */
  const handleSubmit = async (e, price) => {
    e.preventDefault();
    setLoad(true);

    try {
      const user = await AsyncStorage.getItem('user');
      const data = {
        name,
        price,
        login: user ? JSON.parse(user)?.nickname : '',
        hull: 0,
        motherboard: 0,
        cpu: 0,
        cooler: 0,
        ram: [],
        gpu: [],
        hard_disk: [],
        power_supply: 0,
      };

      componentsInfo.forEach(item => {
        if (typeof data[item.type] === 'object') {
          data[item.type].push({id: item.id, count: item.count});
        } else {
          data[item.type] = item.id;
        }
      });

      await addAssembly(data);
      await AsyncStorage.multiRemove([
        'idx',
        'error',
        'assemblyInfo',
        'checkInfo',
      ]);
      navigation.navigate('Home');
    } catch (e) {
      alert('Ошибка при создании сборки');
    } finally {
      setLoad(false);
    }
  };

  /**
   * Поиск компонентов по бренду и модели
   */
  const handleSearchComponents = async (value, type) => {
    setSearch(value);
    if (!value) {
      setSearchComponents([]);
      return;
    }

    setLoad(true);
    const searchParams = value.split(',');

    try {
      const response = await getAddComponents(
        searchParams[0]?.trim(),
        searchParams[1]?.trim(),
        type,
      );
      setSearchComponents(response.obj);
    } catch (e) {
      setSearchComponents([]);
    } finally {
      setLoad(false);
    }
  };

  /**
   * Добавление компонента в сборку
   */
  const handleAddComponent = async (type, data) => {
    if (data.status !== 'accepted') {
      alert('Внимание! Комплектующее не подтверждено администратором');
    }

    const component = {
      id: data.id,
      type,
      name: `${data.brand} ${data.model}`,
      price:
        data.price * (['ram', 'gpu', 'hard_disk'].includes(type) ? count : 1),
      logo: data.logo,
      count: ['ram', 'gpu', 'hard_disk'].includes(type) ? count : 1,
    };

    const updatedComponents = componentsInfo.filter(item => item.type !== type);
    updatedComponents.push(component);

    setComponentsInfo(updatedComponents);
    await AsyncStorage.setItem(
      'assemblyInfo',
      JSON.stringify(updatedComponents),
    );
  };

  /**
   * Переход к следующему компоненту
   */
  const handleNext = async () => {
    const newIdx = componentIdx + 1;
    if (newIdx < component_status.length) {
      setComponentIdx(newIdx);
      await AsyncStorage.setItem('idx', newIdx.toString());
      setSearch('');
      setCount(1);
      setSearchComponents([]);
    }
  };

  /**
   * Возврат к предыдущему компоненту
   */
  const handleBack = async type => {
    const newIdx = componentIdx - 1;
    if (newIdx >= 0) {
      setComponentIdx(newIdx);
      await AsyncStorage.setItem('idx', newIdx.toString());
      setComponentsInfo(componentsInfo.filter(item => item.type !== type));
      setErrorComponent({...errorComponent, [type]: []});
      setSearch('');
      setCount(1);
      setSearchComponents([]);
    }
  };

  /**
   * Очистка всей сборки
   */
  const handleClear = async () => {
    await AsyncStorage.multiRemove([
      'idx',
      'error',
      'assemblyInfo',
      'checkInfo',
    ]);
    setComponentIdx(0);
    setComponentsInfo([]);
    setErrorComponent({
      hull: [],
      motherboard: [],
      cpu: [],
      cooler: [],
      ram: [],
      gpu: [],
      hard_disk: [],
      power_supply: [],
    });
    setCheckInfo({
      hull: {
        form_factor: null,
        slots_count: null,
        max_length_gpu: null,
        max_height_culler: null,
      },
      motherboard: {
        socket: null,
        type_ram: null,
        memory_frequency_specification: null,
        maximum_memory_size: null,
        all_slots: null,
      },
      cpu: {
        max_heat_generation: null,
        type_rams: null,
        maximum_memory_size: null,
      },
      cooler: {
        max_heat_generation: null,
        all_socket: null,
        power_consumption: null,
      },
      ram: [],
      gpu: [],
      hard_disk: [],
      power_supply: {},
    });
  };

  return (
    <View style={styles.container}>
      <ComponentStatusBox
        type={component_status[componentIdx]}
        error={errorComponent[component_status[componentIdx]] || []}
      />

      <AddComponent
        header={add_component_head[component_status[componentIdx]]}
        type={component_status[componentIdx]}
        load={load}
        components={searchComponents}
        onChange={handleSearchComponents}
        onChangeCount={setCount}
        count={count}
        addComponent={handleAddComponent}
        search={search}
        next={handleNext}
        back={handleBack}
        navigation={navigation}
      />

      <SaveAssembly
        info={componentsInfo}
        clear={handleClear}
        error={errorComponent}
        name={name}
        handleChangeName={setName}
        handleSubmit={handleSubmit}
        load={load}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
