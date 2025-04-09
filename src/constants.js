//Url дефолтной аватарки
export const defaultAvatarUrl = 'aboba';

//Объект шапки комплектующего type: Шапка
export const component_header = {
  motherboard: 'Материнская плата',
  cpu: 'Процессор',
  ram: 'Оперативная память',
  gpu: 'Видеокарта',
  cooler: 'Система охлаждения',
  power_supply: 'Блок питания',
  hard_disk: 'Жёсткий диск',
  hull: 'Корпус',
};

//Объект информации о ошибке комплектующего
export const component_status = [
  'hull',
  'motherboard',
  'cpu',
  'cooler',
  'ram',
  'gpu',
  'hard_disk',
  'power_supply',
];
//Объект с хедером добавляющегося компонента
export const add_component_head = {
  hull: 'Добавить корпус',
  motherboard: 'Добавить материнскую плату',
  cpu: 'Добавить процессор',
  cooler: 'Добавить систему охлаждения',
  ram: 'Добавить оперативную память',
  gpu: 'Добавить видеокарту',
  hard_disk: 'Добавить жёсткий диск',
  power_supply: 'Добавить блок питания',
};

//Объект со всеми комплектющими, для удобства отрисовки
export const pc_components = {
  motherboard: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'socket',
      note: 'Сокет:',
    },
    {
      code_name: 'chipset',
      note: 'Чипсет',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
  cpu: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'generation',
      note: 'Поколение:',
    },
    {
      code_name: 'socket',
      note: 'Сокет:',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
  ram: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'memory_size',
      note: 'Память в Гб.:',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
  gpu: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'memory_size',
      note: 'Объём видопамяти в Гб.:',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
  cooler: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'cooling_type',
      note: 'Тип охлаждения:',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
  power_supply: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'power',
      note: 'Мощность в Вт.:',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
  hard_disk: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'memory_size',
      note: 'Объём накопителя в Гб.:',
    },
    {
      code_name: 'type_disk',
      note: 'Тип жёсткого диска:',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
  hull: [
    {
      code_name: 'brand',
      note: 'Бренд:',
    },
    {
      code_name: 'model',
      note: 'Модель:',
    },
    {
      code_name: 'form_factor',
      note: 'Форм-фактор корпуса:',
    },
    {
      code_name: 'price',
      note: 'Средняя стоимость в Руб.:',
    },
    {
      code_name: 'status',
      note: 'Достоверность:',
    },
  ],
};

//Объект со сборкой для облегчения отрисовки
export const assembly = [
  {
    type: 'motherboard',
    code_name: 'motherboard',
    note: 'Материнская плата ',
  },
  {
    type: 'cpu',
    code_name: 'cpu',
    note: 'Процессор ',
  },
  {
    type: 'ram',
    code_name: 'rams',
    note: 'Оперативная память ',
  },
  {
    type: 'gpu',
    code_name: 'gpus',
    note: 'Видеокарта ',
  },
  {
    type: 'cooler',
    code_name: 'cooler',
    note: 'Система охлаждения ',
  },
  {
    type: 'power_supply',
    code_name: 'power_supply',
    note: 'Блок питания ',
  },
  {
    type: 'hard_disk',
    code_name: 'hard_disks',
    note: 'Жёсткий диск ',
  },
  {
    type: 'hull',
    code_name: 'hull',
    note: 'Корпус ',
  },
];

//лого для комплектующих
export const component_logo = {
  motherboard: 'https://main-cdn.sbermegamarket.ru/big2/hlr-system/1573366415/100023001835b6.jpg',
  cpu: 'https://i.playground.ru/e/Qx_OWk6_Bq3ZS25C6UKYJA.webp',
  ram: 'https://img1-327a.kxcdn.com/DataImage.ashx/9806080',
  gpu: 'https://static.onlinetrade.ru/img/items/m/videokarta_zotac_geforce_rtx_3060_12288mb_twin_edge_oc_zt_a30600h_10m__1824854_3.jpg',
  cooler: 'https://cdn1.ozone.ru/s3/multimedia-i/6046520946.jpg',
  power_supply: 'https://www.ixbt.com/power/psu/photos/xilence/xp600-ge/1000/psu_003.jpg',
  hard_disk: 'https://sun9-71.userapi.com/impg/9p7O9QwUse7iN4Bk4MSJYQZI3gzg5AAfM-rddQ/HcHS1ri1HtM.jpg?size=807x539&quality=96&sign=33c1217cefb1a4a6d937631f5836765d&c_uniq_tag=E0VsLN4j447XA5Bw53j68v8n3zt-54_3pNj0IiaeVkM&type=album',
  hull: 'https://avatars.mds.yandex.net/get-mpic/5346941/img_id8504153961996386214.jpeg/orig'
}

//Объект для создания комплектующего
export const create_component = {
  motherboard: {
    head: 'Создание материнской платы',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    form_factor: {
      label: 'Введите форм-фактор:',
      type: 'text',
      note: '',
    },
    power_connector: {
      label: 'Введите разъём питания материнской платы:',
      type: 'text',
      note: 'вида XX pin',
    },
    socket: {
      label: 'Введите сокет:',
      type: 'text',
      note: '',
    },
    chipset: {
      label: 'Введите чипсет:',
      type: 'text',
      note: '',
    },
    type_ram: {
      label: 'Введите тип оперативной памяти:',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "DDR3, DDR4"',
    },
    form_factor_ram: {
      label: 'Введите форм-фактор поддерживаемой оперативной памяти:',
      type: 'text',
      note: '',
    },
    memory_frequency_specification: {
      label: 'Введите частотную спецификацию оперативной памяти:',
      type: 'number',
      note: 'МГц.',
    },
    maximum_memory_size: {
      label: 'Введите максимальный объём оперативной памяти:',
      type: 'number',
      note: 'Гб.',
    },
    all_slots: {
      label: 'Введите слоты и расширения:',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "M.2, PCI-E x1"',
    },
    count_slots: {
      label: 'Введите кол-во перечислених слотов и расширений:',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "1, 1"',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
  cpu: {
    head: 'Создание процессора',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    socket: {
      label: 'Введите сокет:',
      type: 'text',
      note: '',
    },
    generation: {
      label: 'Введите поколение процессора:',
      type: 'text',
      note: '',
    },
    heat_generation: {
      label: 'Введите тепловыделение:',
      type: 'text',
      note: 'вида "min-max"',
    },
    type_ram: {
      label: 'Введите тип оперативной памяти:',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "DDR3, DDR4"',
    },
    memory_frequency_specification: {
      label: 'Введите поддержку частот оперативной памяти:',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "DDRX XXXX, DDRX XXXX"',
    },
    maximum_memory_size: {
      label: 'Введите максимальный объём оперативной памяти:',
      type: 'number',
      note: 'Гб.',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
  ram: {
    head: 'Создание оперативной памяти',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    type_ram: {
      label: 'Введите тип оперативной памяти:',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "DDR3, DDR4"',
    },
    form_factor_ram: {
      label: 'Введите форм-фактор оперативной памяти:',
      type: 'text',
      note: '',
    },
    memory_size: {
      label: 'Введите объём оперативной памяти:',
      type: 'number',
      note: 'Гб.',
    },
    memory_frequency_specification: {
      label: 'Введите тактовую частоту:',
      type: 'number',
      note: 'МГц.',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
  gpu: {
    head: 'Создание видеокарты',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    interface: {
      label: 'Введите интерфейс:',
      type: 'text',
      note: '',
    },
    power_connector: {
      label: 'Введите разъём дополнительного питания:',
      type: 'text',
      note: '',
    },
    memory_size: {
      label: 'Введите объём видеопамяти:',
      type: 'number',
      note: 'Гб.',
    },
    power_consumption: {
      label: 'Введите потребляемую мощность:',
      type: 'number',
      note: 'Вт.',
    },
    length: {
      label: 'Введите длину:',
      type: 'number',
      note: 'мм.',
    },
    height: {
      label: 'Введите высоту:',
      type: 'number',
      note: 'мм.',
    },
    thickness: {
      label: 'Введите толщину:',
      type: 'number',
      note: 'мм.',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
  cooler: {
    head: 'Создание системы охлаждения',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    cooling_type: {
      label: 'Введите тип охлаждения:',
      type: 'text',
      note: '',
    },
    max_heat_generation: {
      label: 'Введите максимальное тепловыделение:',
      type: 'number',
      note: 'Вт.',
    },
    socket_compatibility: {
      label: 'Введите все подходящие сокеты',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "Socket 2011, SocketAM4"',
    },
    power_consumption: {
      label: 'Введите потребляемую мощность:',
      type: 'number',
      note: 'Вт.',
    },
    length: {
      label: 'Введите длину:',
      type: 'number',
      note: 'мм.',
    },
    width: {
      label: 'Введите ширину:',
      type: 'number',
      note: 'мм.',
    },
    height: {
      label: 'Введите высоту:',
      type: 'number',
      note: 'мм.',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
  power_supply: {
    head: 'Создание блока питания',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    power: {
      label: 'Введите мощность:',
      type: 'number',
      note: 'Вт.',
    },
    form_factor: {
      label: 'Введите форм-фактор:',
      type: 'text',
      note: '',
    },
    power_supply: {
      label: 'Введите разъёмы питания для комплектующих:',
      type: 'text',
      note: 'Перечисление идёт через запятую, пример "Материнская плата XX pin, питание процессора XX pin, питание видеокарты XX pin"',
    },
    height: {
      label: 'Введите высоту:',
      type: 'number',
      note: 'мм.',
    },
    width: {
      label: 'Введите ширину:',
      type: 'number',
      note: 'мм.',
    },
    thickness: {
      label: 'Введите толщину:',
      type: 'number',
      note: 'мм.',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
  hard_disk: {
    head: 'Создание жёсткого диска',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    memory_size: {
      label: 'Введите объём накопителя:',
      type: 'number',
      note: 'Гб.',
    },
    type_disk: {
      label: 'Введите тип жёсткого диска:',
      type: 'text',
      note: '',
    },
    connector: {
      label: 'Введите разъём:',
      type: 'text',
      note: '',
    },
    power_consumption: {
      label: 'Введите потребляемую мощность:',
      type: 'number',
      note: 'Вт.',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
  hull: {
    head: 'Создание корпуса',
    brand: {
      label: 'Введите название бренда:',
      type: 'text',
      note: '',
    },
    model: {
      label: 'Введите название модели:',
      type: 'text',
      note: '',
    },
    form_factor: {
      label: 'Введите форм-фактор для материнской платы:',
      type: 'text',
      note: '',
    },
    slots_count: {
      label: 'Введите количество слотов расширений:',
      type: 'number',
      note: 'Шт.',
    },
    max_length_gpu: {
      label: 'Введите максимальную длину видеокарты:',
      type: 'number',
      note: 'мм.',
    },
    max_height_culler: {
      label: 'Введите максимальную высоту куллера:',
      type: 'number',
      note: 'мм.',
    },
    width: {
      label: 'Введите ширину:',
      type: 'number',
      note: 'мм.',
    },
    height: {
      label: 'Введите высоту:',
      type: 'number',
      note: 'мм.',
    },
    thickness: {
      label: 'Введите толщину:',
      type: 'number',
      note: 'мм.',
    },
    price: {
      label: 'Введите среднюю стоимость:',
      type: 'number',
      note: 'Руб.',
    },
  },
};
