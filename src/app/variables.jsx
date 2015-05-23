var categories = {
  '運輸': {
    icon: 'motorcycle',
    color: 'crap',
    colorCode: '#AD49AD',
    url: './images/transportation.png'
  },
  '教學': {
    icon: 'book',
    color: 'lavender',
    colorCode: '#89AD1A',
    url: './images/teaching.png'
  },
  '科技': {
    icon: 'desktop',
    color: 'sky',
    colorCode: '#1A92AD',
    url: './images/tech.png'
  },
  '餐點': {
    icon: 'coffee',
    color: 'crimson',
    colorCode: '#F5E72E',
    url: './images/food.png'
  },
  '修理': {
    icon: 'wrench',
    color: 'grass',
    colorCode: '#A67522',
    url: './images/repairment.png'
  },
  '其他': {
    icon: 'rocket',
    color: 'iron',
    colorCode: '#8D8D8D',
    url: './images/others.png'
  },
  '無理的要求': {
    icon: 'chain-broken',
    color: 'red',
    colorCode: '#AE1261',
    url: './images/others.png'
  }
};

var leftButtons = {
  'back': 'angle-left'
};

var rightButtons = {
  'edit': 'pencil-square-o',
  'location': 'location-arrow'
};

module.exports = {
  categories: categories,
  rightButtons: rightButtons,
  leftButtons: leftButtons
};
