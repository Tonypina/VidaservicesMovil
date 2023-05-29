import React from 'react';
import {Image} from 'react-native';
import Logo from './Logo';
import VidaAssistance from './VidaAssistence';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Navbar = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('previaFormulario')}>
      <View style={styles.container}>
        <Logo style={styles.logo}></Logo>
        <VidaAssistance style={styles.text}></VidaAssistance>
      </View>
    </TouchableOpacity>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  logo: {
    height: 35,
    width: 35,
    marginTop: 55,
    marginLeft: 35,
  },
  arrowContainer: {
    height: 35,
    width: 35,
    marginTop: 55,
    marginLeft: 35,
  },
  arrow: {
    transform: 'translate(0vw, 5vh)',
    height: 25,
    width: 25,
  },  
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
    height: 150,
    width: 150,
  },
});
