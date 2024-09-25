import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// const windowWidth = Dimensions.get('window').width;
const LogInComponent = () => {
  const navigation = useNavigation();
  const usernameRef = useRef(null);
  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.login_container}>
        <View style={styles.logo_box}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo_image}
          />
        </View>
        <Text style={styles.title}>Login</Text>

        <View style={styles.input_container}>
          <Image
            source={require('../assets/images/login_icon1.png')}
            style={styles.input_image}
          />
          <TextInput
            style={styles.input_text}
            onChangeText={text => setUserID(text)}
            value={userID}
            placeholder="ID"
            placeholderTextColor="#1EA3D6"
            ref={usernameRef}
          />
        </View>
        <View
          style={{
            ...styles.input_container,
            marginTop: 30,
          }}>
          <Image
            source={require('../assets/images/login_icon2.png')}
            style={styles.input_image}
          />
          <TextInput
            style={styles.input_text}
            onChangeText={text => setUserPW(text)}
            value={userPW}
            placeholder="PASSWORD"
            placeholderTextColor="#1EA3D6"
            ref={usernameRef}
            secureTextEntry={true}
          />
        </View>
        <Text style={styles.text}>Forgot password?</Text>
        <View style={styles.btn_container}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('Home', {data: userID});
            }}>
            <Text style={styles.btn_text}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.btn, backgroundColor: '#121212'}}
            onPress={() => {}}>
            <Text
              style={{
                ...styles.btn_text,
                color: '#1EA3D6',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modal_container}>
          <Text style={styles.modal_text}>
            아이디 또는 비밀번호를 확인해주세요.
          </Text>
          <TouchableOpacity
            style={styles.modal_btn}
            onPress={() => {
              setUsername('');
              setPassword('');
              setModalVisible(false);
            }}>
            <Text style={styles.modal_btn_text}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
    </>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    // position: 'absolute',
    // bottom: 0,
    justifyContent: 'flex-end',
  },
  login_container: {
    height: 'auto',
    flex: 1,
    alignItems: 'flex-start',
    // position: 'relative',
  },
  logo_box: {
    width: '100%',
    height: 55,
    display: 'flex',
    alignItems: 'center',
    marginTop: 50,
  },
  logo_image: {
    width: 100,
    height: 55,
  },
  title: {
    textAlign: 'left',
    fontSize: 32,
    fontWeight: '800',
    fontFamily: 'inter',
    marginTop: 80,
    marginBottom: 80,
    marginLeft: 40,
    color: '#1EA3D6',
  },
  input_container: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#B2B2B2',
  },
  input_image: {
    width: 18,
    height: 18,
    marginLeft: 40,
  },
  input_text: {
    fontSize: 14,
    color: '#1EA3D6',
    fontWeight: '500',
    marginLeft: 15,
  },
  text: {
    fontSize: 13,
    color: '#B1B0AF',
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 20,
  },
  btn_container: {
    width: '100%',
    height: 180,
    position: 'absolute',
    bottom: 0,
  },
  btn: {
    fontSize: 20,
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1EA3D6',
    fontWeight: '600',
    color: '#292724',
  },
  btn_text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#292724',
  },
  // modal_container: {
  //   width: 293,
  //   height: 135,
  //   shadowColor: '#000000',
  //   shadowOffset: {width: 2, height: 3},
  //   shadowOpacity: 0.8,
  //   shadowRadius: 8,
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   position: 'absolute',
  //   left: (Dimensions.get('window').width - 293) / 2,
  //   top: (Dimensions.get('window').height - 135) / 2,
  //   alignItems: 'center',
  // },
  // modal_text: {
  //   fontSize: 15,
  //   fontWeight: '500',
  //   color: '#717171',
  //   marginTop: 50,
  // },
  // modal_btn: {
  //   width: 63,
  //   height: 24,
  //   borderRadius: 6,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#12B6D1',
  //   marginTop: 20,
  // },
  // modal_btn_text: {
  //   fontSize: 13,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
});

export default LogInComponent;
