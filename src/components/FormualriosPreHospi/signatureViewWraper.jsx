import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from '../styles/styles';
import SignatureView from '../SignatureView';

const SignatureViewWrapper = ({
  title,
  signatureData,
  onShow,
  onSave,
  onClear,
  signatureView,
}) => (
  <View style={styles.containerFirma}>
    <TouchableOpacity onPress={onShow}>
      <View>
        <Text style={styles.titleText}>
          {signatureData
            ? `Firma ${title}:`
            : `Presiona para firmar (${title})`}
        </Text>
        {signatureData && (
          <View style={styles.imageContainer}>
            <Image style={styles.previewImage} source={{uri: signatureData}} />
            <TouchableOpacity style={styles.addBoton} onPress={onClear}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Limpiar Firma
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
    <SignatureView ref={signatureView} rotateClockwise={true} onSave={onSave} />
  </View>
);

export default SignatureViewWrapper;
