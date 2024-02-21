import { AnyData } from 'feathers-pinia';

export default {
  data: [],
  create: (data: AnyData) => {
    const value = {
      'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE3MDg1MzQxMTEsImV4cCI6MTcwODYyMDUxMSwiYXVkIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsInN1YiI6IjY1ZDYyOTJmY2NmMTAxMGMyM2E3YTM0NyIsImp0aSI6ImQ5MDE5NjQ5LTRiZmUtNDBkZC1hNWQzLTEzYmViZmU5M2NlZSJ9.y94CQfVqC0iWxnAQVb6-WBVsBJeZdXygtWx9JMd9sGA',
      'authentication': {
        'strategy': 'local',
        'payload': {
          'iat': 1708534111,
          'exp': 1708620511,
          'aud': 'https://example.com',
          'sub': '65d6292fccf1010c23a7a347',
          'jti': 'd9019649-4bfe-40dd-a5d3-13bebfe93cee'
        }
      },
      'user': {
        '_id': '65d6292fccf1010c23a7a347',
        'firstName': 'a',
        'lastName': 'a',
        'email': 'acc@acc.com',
        'avatarUrl': 'https://www.gravatar.com/avatar/64b7dea156b914692b8ebc76e8bbc2fd',
        'fullName': 'a a'
      }
    };
    value.authentication = { ...value.authentication, ...data };
    return value;
  },
};
