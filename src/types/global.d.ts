interface IEvent {
  id: string;
  name: string;
  type: string;
  url: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  _embedded: {
    venues: Array<{
      name: string;
      city: {
        name: string;
      };
      country: {
        name: string;
      };
    }>;
  };
}

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

type Route = RouteProp<Record<string, object>, string>;
