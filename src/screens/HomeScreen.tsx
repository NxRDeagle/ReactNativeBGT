import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import axios from 'axios';
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Config from 'react-native-config';

const HomeScreen = () => {
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [location, setLocation] = React.useState<GeoCoordinates | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [locationError, setLocationError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const requestLocationPermission = async () => {
      const locationPermission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await check(locationPermission);

      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else if (result === RESULTS.DENIED) {
        const permissionRequest = await request(locationPermission);

        if (permissionRequest === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setLocationError('Доступ к геолокации не предоставлен');
          setLoading(false);
        }
      } else {
        setLocationError('Доступ к геолокации не предоставлен');
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        fetchEvents(position.coords);
      },
      _ => {
        setLocationError('Не удалось получить местоположение');
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const fetchEvents = async (coords: GeoCoordinates) => {
    const size = 20; // Макс. кол-во мероприятий
    const radius = 300; // Радиус поиска в км
    try {
      const query = `${Config.MAIN_API_URL}?apikey=${Config.MAIN_API_KEY}&latlong=${coords.latitude},${coords.longitude}&radius=${radius}&locale=*&size=${size}`;
      const response = await axios.get(query);
      setEvents(response.data._embedded?.events);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderEventItem = ({item}: {item: IEvent}) => {
    const imageUrl =
      item.images.find(img => img.width > 300)?.url || item.images[0]?.url;
    const venue = item._embedded.venues[0];

    return (
      <View style={styles.eventItem}>
        {imageUrl && (
          <Image source={{uri: imageUrl}} style={styles.eventImage} />
        )}
        <Text style={styles.eventTitle}>{item.name}</Text>
        <Text style={styles.eventDate}>
          {item.dates.start.localDate} {item.dates.start.localTime?.slice(0, 5)}
        </Text>
        {venue && (
          <Text style={styles.eventLocation}>
            {venue.name}, {venue.city.name}, {venue.country.name}
          </Text>
        )}
        <Text style={styles.eventLink} onPress={() => console.log(item.url)}>
          Подробнее
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {locationError && <Text style={styles.errorText}>{locationError}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item: IEvent) => item.id}
          renderItem={renderEventItem}
          ListEmptyComponent={<Text>Мероприятии не найдены.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  eventItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventLink: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default HomeScreen;
