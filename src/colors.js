// @flow

export const getRatColor = (id: number) => {
  switch (id) {
    case 1:
      return '#3AB91A'; // green
    case 2:
      return '#00ACFF'; // blue
    case 3:
      return '#F6FF00'; // yellow
    case 4:
      return '#FF8400'; // orange
    default:
      return 'grey';
  }
};

export const getUnselectedRatIcon = (id: number) => {
  switch (id) {
    case 1:
      return require('../assets/images/mouse-boy-green-unselected.png');
    case 2:
      return require('../assets/images/mouse-boy-blue-unselected.png');
    case 3:
      return require('../assets/images/mouse-boy-yellow-unselected.png');
    case 4:
      return require('../assets/images/mouse-boy-red-unselected.png');
    default:
      throw new Error('Unexpected rat id ' + id);
  }
};

export const getSelectedRatIcon = (id: number) => {
  switch (id) {
    case 1:
      return require('../assets/images/mouse-boy-green-selected.png');
    case 2:
      return require('../assets/images/mouse-boy-blue-selected.png');
    case 3:
      return require('../assets/images/mouse-boy-yellow-selected.png');
    case 4:
      return require('../assets/images/mouse-boy-red-selected.png');
    default:
      throw new Error('Unexpected rat id ' + id);
  }
};
