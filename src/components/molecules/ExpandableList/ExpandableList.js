import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
// import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DmzText from '../../atoms/DmzText/DmzText';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../styles/index';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const ExpandableList = props => {
  const [showContent, setShowContent] = useState(false);
  const {
    name = ' ',
    fontSize = 3,
    nestedList,
    onPressList,
    onClickQuestion,
    option,
  } = props;
  const onClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowContent(!showContent);
    onPressList();
  };

  console.log('.....................');
  //   console.log(props);
  return (
    <View style={styles.Wrapper}>
      <TouchableOpacity
        style={[styles.flex, styles.container, styles.AlignCenter]}
        onPress={onClick}>
        <DmzText
          text={name}
          type={fontSize}
          normal
          gap_small
          style={{
            color: showContent ? Colors.header_grad_two : '#222',
          }}
        />
      </TouchableOpacity>
      {showContent && (
        <View style={styles.nestedContainer}>
          {nestedList &&
            nestedList.map(item => {
              const linked = item.option.reduce((acc, curr) => {
                acc.push(...curr.linkedQuestion);
                return acc;
              }, []);
              return (
                <ExpandableList
                  name={item.title.slice(0, 20).concat('...')}
                  key={item._id}
                  onPressList={() => onClickQuestion(item)}
                  nestedList={linked ? linked : []}
                  onClickQuestion={onClickQuestion}
                />
              );
            })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  AlignCenter: {alignItems: 'center'},
  Wrapper: {backgroundColor: '#fafafa', overflow: 'hidden'},
  container: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nestedContainer: {
    width: '80%',
    marginLeft: 20,
  },
});

export default ExpandableList;
