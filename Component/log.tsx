import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native';
const LogComponent = () => {
  const navigation = useNavigation();
  const usernameRef = useRef(null);
  const userID = 'admin';
  const userPW = 'admin';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Home');

    // if (username === userID && password === userPW) {
    //   navigation.navigate('Home');
    // } else {
    //   setModalVisible(true);
    //   if (usernameRef.current) {
    //     usernameRef.current.focus();
    //   }
    // }
  };

  const openAlert = () => {
    navigation.navigate('SignIn');
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 아이디 입력 칸에 커서 설정
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);
  return (
    <>
      <View style={log_styles.log_container}>
        <Image
          source={require('../assets/images/intro_image.png')}
          style={log_styles.log_image}
        />
        <View style={log_styles.input_container}>
          <TextInput
            style={log_styles.input}
            onChangeText={text => setUsername(text)}
            value={username}
            placeholder="아이디를 입력하세요"
            ref={usernameRef}
          />
          <TextInput
            style={log_styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="비밀번호를 입력하세요"
            secureTextEntry={true} // 비밀번호 입력 필드로 설정
          />
          <TouchableOpacity style={log_styles.log_btn1} onPress={handleLogin}>
            <Text style={log_styles.btn_text1}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={log_styles.log_btn2} onPress={openAlert}>
            <Text style={log_styles.btn_text2}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View style={log_styles.modal_container}>
          <Text style={log_styles.modal_text}>
            아이디 또는 비밀번호를 확인해주세요.
          </Text>
          <TouchableOpacity
            style={log_styles.modal_btn}
            onPress={() => {
              setUsername('');
              setPassword('');
              setModalVisible(false);
            }}>
            <Text style={log_styles.modal_btn_text}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const log_styles = StyleSheet.create({
  log_container: {
    flex: 1,
    alignItems: 'center',
  },
  log_image: {
    width: 145,
    height: 144,
    marginTop: 121,
  },
  input_container: {
    marginTop: windowWidth * 0.1799,
  },
  input: {
    width: windowWidth * 0.86,
    height: 40,
    borderWidth: 1,
    borderColor: '#12B6D1',
    borderRadius: 7,
    paddingLeft: 12,
    marginBottom: windowWidth * 0.0327,
  },
  log_btn1: {
    width: windowWidth * 0.86,
    height: 47,
    marginTop: windowWidth * 0.02,
    borderWidth: 1,
    borderColor: '#12B6D1',
    borderRadius: 7,
    backgroundColor: '#12B6D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text1: {
    fontSize: 23,
    color: 'white',
  },
  log_btn2: {
    width: windowWidth * 0.86,
    height: 47,
    marginTop: windowWidth * 0.02,
    borderWidth: 1,
    borderColor: '#12B6D1',
    borderRadius: 7,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text2: {
    fontSize: 23,
    color: '#12B6D1',
  },
  modal_container: {
    width: 293,
    height: 135,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    left: (Dimensions.get('window').width - 293) / 2,
    top: (Dimensions.get('window').height - 135) / 2,
    alignItems: 'center',
  },
  modal_text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#717171',
    marginTop: 50,
  },
  modal_btn: {
    width: 63,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#12B6D1',
    marginTop: 20,
  },
  modal_btn_text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default LogComponent;
