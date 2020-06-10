import React from 'react';
import {StyleSheet, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
function RatingStarts({rating, activeColor, passiveColor, size, filled}) {
  const ratingStars = (() => {
    let arr = [];
    let i, j;
    for (i = 0; i < rating; i++) {
      arr.push(
        <FontAwesomeIcon
          key={i}
          name="star"
          size={size || 11}
          color={activeColor || '#F4C130'}
          style={{marginRight: 4}}
        />,
      );
    }
    for (j = 0; j < 5 - rating; j++) {
      arr.push(
        filled ? (
          <FontAwesomeIcon
            key={i}
            name="star"
            size={size || 11}
            color={passiveColor || '#fafafa'}
          />
        ) : (
          <Icon
            key={i + j}
            name="star"
            size={(size && size - 2) || 9}
            color={passiveColor || '#F4C130'}
          />
        ),
      );
    }
    return arr;
  })();
  return <View style={Styles.Rating}>{ratingStars}</View>;
}

const Styles = StyleSheet.create({
  Rating: {
    flexDirection: 'row',
    marginLeft: 5,
  },
});
export default RatingStarts;
