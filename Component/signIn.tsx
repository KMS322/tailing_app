import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;

const SignInComponent = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/intro_image.png')}
            style={styles.header_image}
          />
          <Text style={styles.header_text}>수의사 회원가입</Text>
          <TouchableOpacity
            style={styles.header_btn_container}
            onPress={() => navigation.goBack()}>
            <Text style={styles.header_btn}>돌아가기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form_container}>
          <Text style={styles.inputTitle}>아이디</Text>
          <TextInput
            style={styles.inputText}
            // onChangeText={text => setUsername(text)}
            // value={username}
            placeholder="아이디를 입력해주세요."
          />
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btn_text}>중복확인</Text>
          </TouchableOpacity>
          <Text style={styles.inputTitle}>비밀번호</Text>
          <TextInput
            style={styles.inputText}
            // onChangeText={text => setUsername(text)}
            // value={username}
            placeholder="비밀번호를 입력해주세요."
          />
          <Text style={styles.inputTitle}>비밀번호 확인</Text>
          <TextInput
            style={styles.inputText}
            // onChangeText={text => setUsername(text)}
            // value={username}
            placeholder="비밀번호를 다시 입력해주세요."
          />
          <Text style={styles.inputTitle}>병원 이름</Text>
          <TextInput
            style={styles.inputText}
            // onChangeText={text => setUsername(text)}
            // value={username}
            placeholder="병원 이름을 입력해주세요."
          />
          <TouchableOpacity style={styles.submit_btn}>
            <Text style={styles.submit_btn_text}>회원가입 완료</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal transparent={true}>
        <View style={styles.modal_container}>
          <Text style={styles.modal_text}>서비스 준비 중입니다.</Text>
          <TouchableOpacity
            style={styles.modal_btn}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.modal_btn_text}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderWidth: 1,
  },
  header: {
    width: windowWidth * 0.86,
    height: 47,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  header_image: {
    width: 47,
    height: 47,
  },
  header_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 11,
  },
  header_btn_container: {
    position: 'absolute',
    right: 0,
  },
  header_btn: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#12B6D1',
  },
  form_container: {
    width: windowWidth * 0.86,
    marginTop: 27,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 23,
  },
  inputText: {
    width: '100%',
    height: 40,
    fontWeight: '500',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ACACAC',
    fontSize: 15,
    color: '#C9C9C9',
    marginTop: 16,
    paddingLeft: 10,
  },
  btn: {
    width: 95,
    height: 31,
    backgroundColor: '#12B6D1',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  submit_btn: {
    width: '100%',
    height: 47,
    backgroundColor: '#12B6D1',
    borderRadius: 4,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit_btn_text: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
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
export default SignInComponent;
