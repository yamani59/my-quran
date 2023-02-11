/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        initialRouteName: 'Beranda',
        screens: {
          PrayerTime: {
            screens: {
              PrayerTimeScreen: 'prayer-time'
            }
          },
          Beranda: {
            screens: {
              BerandaScreen: 'beranda',
            },
          },
          Chat: {
            screens: {
              ChatScreen: 'chat',
            },
          },
        },
      },
      Surah: 'surah-detail:id',
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
