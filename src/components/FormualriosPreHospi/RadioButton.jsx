import {View, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles/styles';

const RadioButton = ({id, image, isSelected, onSelect}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <TouchableOpacity
        style={[styles.circle, isSelected ? styles.circleSelected : {}]}
        onPress={() => onSelect(id)}>
        {isSelected && <View style={styles.innerCircle} />}
      </TouchableOpacity>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  );
};

export default RadioButton;
