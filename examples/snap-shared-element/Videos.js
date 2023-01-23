import moment from 'moment';

export default videos = [
  {
    id: '3',
    thumbnail:
      'https://animepatrol.com/wp-content/uploads/2022/09/Haikyuu-Season-5-Release-Date-1024x576.jpg',
    video: require('./assets/1.mp4'),
    title: 'Sending Firebase Data Messages to Expo: iOS',
    username: 'Expo',
    avatar:
      'https://i.pinimg.com/474x/9d/4c/b8/9d4cb8317dd1817fc6bfb901b2e68e2b.jpg',
    views: 189,
    published: moment().subtract(5, 'days'),
  },
  {
    id: '1',
    thumbnail:
      'https://i0.wp.com/anitrendz.net/news/wp-content/uploads/2022/09/bluelock_introductionmoviescreenshot.png?resize=1024%2C576&ssl=1',
    video: require('./assets/2.mp4'),

    title: 'React Native Image Picker Tutorial',
    username: 'Expo',
    avatar:
      'https://i.pinimg.com/736x/e9/f6/6e/e9f66e4e19352d3186eddcddd8fdbdcb.jpg',
    views: 63,
    published: moment().subtract(10, 'days'),
  },
  {
    id: '2',
    thumbnail:
      'https://comicvine.gamespot.com/a/uploads/scale_medium/11156/111564500/8257301-7939447202-82316.jpg',
    video: require('./assets/3.mp4'),

    title: 'PIXI.js in React Native for beginners',
    username: 'Expo',
    avatar:
      'https://i.pinimg.com/originals/95/ff/ff/95ffffcb0628d8200523b06775384292.jpg',
    views: 216,
    published: moment().subtract(17, 'days'),
  },
  {
    id: '4',
    thumbnail:
      'https://i.pinimg.com/originals/8c/2c/0c/8c2c0ca105034f5be3cc261a3e633ef0.png',
    video: require('./assets/4.mp4'),

    title: 'Permissions in React Native for absolute beginners',
    username: 'Expo',
    avatar:
      'https://i1.sndcdn.com/artworks-RKHexz4DtLrRbm1z-7TcsuQ-t500x500.jpg',
    views: 273,
    published: moment().subtract(31, 'days'),
  },
];
