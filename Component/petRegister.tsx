import React, {useState, useEffect, useRef} from 'react';
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
import {RadioButton} from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

const PetRegisterComponent = () => {
  const navigation = useNavigation();
  const usernameRef = useRef(null);
  const [petName, setPetName] = useState('');
  const [petSex, setPetSex] = useState('man');
  const [petNeutral, setPetNeutral] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const items = ['Maltese', 'Pomeranian'];

  useEffect(() => {
    // 컴포넌트가 렌더링될 때 아이디 입력 칸에 커서 설정
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_name_box}>
            <Text style={styles.header_name}>크림오프 동물병원</Text>
            {/* <TouchableOpacity style={detail_styles.btn_box}>
              <Image
                source={require('../assets/images/detail_down_btn.png')}
                style={detail_styles.down_btn}
              />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back_btn}>돌아가기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section_container}>
          <View style={styles.form_container}>
            <Text style={styles.form_title}>이름</Text>
            <TextInput
              style={styles.form_text_input}
              onChangeText={text => setPetName(text)}
              value={petName}
              placeholder="이름을 입력하세요."
              ref={usernameRef}
            />
            <Text style={styles.form_title}>견종</Text>
            <SelectDropdown
              data={items}
              onSelect={(selectedItem, index) => {
                setSelectedItem(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                const arrowImage = isOpened
                  ? require('../assets/images/arrow_up.png')
                  : require('../assets/images/arrow_down.png');
                return (
                  <Image source={arrowImage} style={styles.dropdown_icon} />
                );
              }}
              defaultButtonText={'선택해주세요.'}
              buttonStyle={styles.dropdown_btnStyle}
              buttonTextStyle={styles.dropdown_btnTextStyle}
              dropdownStyle={styles.dropdown_style}
              rowStyle={styles.dropdown_rowStyle}
              rowTextStyle={styles.dropdown_rowTextStyle}
            />
            <View style={styles.radios_container}>
              <View style={styles.radio_container}>
                <Text style={styles.form_title}>성별</Text>
                <View style={styles.radio_btn_container}>
                  <RadioButton
                    value="man"
                    status={petSex === 'man' ? 'checked' : 'unchecked'}
                    onPress={() => setPetSex('man')}
                    color="#12B6D1"
                    uncheckedColor="#12B6D1"
                  />
                  <Text style={styles.radio_text}>남</Text>

                  <RadioButton
                    value="woman"
                    status={petSex === 'woman' ? 'checked' : 'unchecked'}
                    onPress={() => setPetSex('woman')}
                    color="#12B6D1"
                    uncheckedColor="#12B6D1"
                  />
                  <Text style={styles.radio_text}>여</Text>
                </View>
              </View>

              <View style={styles.radio_container}>
                <Text style={styles.form_title}>중성화 여부</Text>
                <View style={styles.radio_btn_container}>
                  <RadioButton
                    value="1"
                    status={petNeutral ? 'checked' : 'unchecked'}
                    onPress={() => setPetNeutral(true)}
                    color="#12B6D1"
                    uncheckedColor="#12B6D1"
                  />
                  <Text style={styles.radio_text}>여</Text>

                  <RadioButton
                    value=""
                    status={petNeutral ? 'unchecked' : 'checked'}
                    onPress={() => setPetNeutral(false)}
                    color="#12B6D1"
                    uncheckedColor="#12B6D1"
                  />
                  <Text style={styles.radio_text}>부</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputs_container}>
              <View style={styles.input1_container}>
                <Text style={styles.form_title}>나이</Text>
                <TextInput
                  style={styles.form_text_input}
                  onChangeText={text => setPetName(text)}
                  value={petName}
                  placeholder="나이를 입력하세요."
                  ref={usernameRef}
                />
              </View>
              <View style={styles.input2_container}>
                <Text style={styles.form_title}>몸무게</Text>
                <TextInput
                  style={styles.form_text_input}
                  onChangeText={text => setPetName(text)}
                  value={petName}
                  placeholder="몸무게를 입력하세요."
                  ref={usernameRef}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.submit_btn}>
            <Text style={styles.submit_btn_text}>등록 완료</Text>
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
    width: '100%',
    height: '100%',
    backgroundColor: '#12B6D1',
    alignItems: 'center',
  },
  intro_image: {
    width: windowWidth * 0.5, // 부모 컴포넌트의 너비의 50%
    height: windowWidth * 0.5 * (253 / 255), // 비율 유지를 위한 높이 계산
    aspectRatio: 255 / 253,
  },
  header: {
    width: windowWidth * 0.86,
    height: 58,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_name_box: {
    flexDirection: 'row',
  },
  header_name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  back_btn: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  section_container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
  },
  form_container: {
    width: windowWidth * 0.86,
    marginTop: 34,
  },
  form_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#12B6D1',
    marginTop: 21,
  },
  form_text_input: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DDDDDD',
    paddingLeft: 0,
    paddingBottom: 0,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
  },
  dropdown_btnStyle: {
    width: 120,
    height: 23,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    backgroundColor: 'white',
    position: 'relative',
  },
  dropdown_btnTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#DDDDDD',
    textAlign: 'center',
    position: 'absolute',
    right: -8,
  },
  dropdown_style: {
    backgroundColor: 'white',
  },
  dropdown_rowStyle: {
    borderWidth: 0,
    borderBottomColor: 'white',
    position: 'relative',
  },
  dropdown_rowTextStyle: {
    fontSize: 14,
    textAlign: 'center',
    position: 'absolute',
    left: 10,
  },
  radios_container: {
    flexDirection: 'row',
  },
  radio_container: {
    marginRight: 54,
  },
  radio_btn_container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  radio_text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#12B6D1',
  },
  dropdown_icon: {
    width: 16,
    height: 8,
  },
  inputs_container: {
    width: windowWidth * 0.86,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input1_container: {
    width: '38%',
  },
  input2_container: {
    width: '50%',
    marginRight: 15,
  },
  submit_btn: {
    width: windowWidth * 0.86,
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
    borderWidth: 1,
    borderColor: 'gray',
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
export default PetRegisterComponent;
