import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ListComponent from './listComponent';
import {usePetContext} from '../AppContext';
const windowWidth = Dimensions.get('window').width;
const ShowListComponent = () => {
  const {pets, setPets} = usePetContext();
  const navigation = useNavigation();
  const [openPopup, setOpenPopup] = useState(false);
  const [petTitle, setPetTitle] = useState('');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petSex, setPetSex] = useState('');
  const addPets = () => {
    const newPet = {
      id: pets.length + 1,
      title: petTitle,
      name: petName,
      breed: petBreed,
      weight: petWeight,
      age: petAge,
      sex: petSex,
    };
    const newPetsArray = [...pets, newPet];

    // 새로운 배열로 상태 업데이트
    setPets(newPetsArray);

    // 나머지 입력 값 초기화
    setPetTitle('');
    setPetName('');
    setPetBreed('');
    setPetWeight('');
    setPetAge('');
    setPetSex('');
    setOpenPopup(false);
  };

  return (
    <>
      <View style={styles.list_container}>
        <View style={styles.btn_box}>
          <TouchableOpacity
            onPress={() => {
              setOpenPopup(true);
            }}>
            <Image
              source={require('../assets/images/plus_btn.png')}
              style={styles.btn}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../assets/images/trash_btn.png')}
              style={styles.btn}
            />
          </TouchableOpacity>
        </View>
        {pets.length === 0 ? (
          <Text style={styles.empty_text}>
            You should touch a plus button{'\n'}to add a list
          </Text>
        ) : openPopup ? (
          ''
        ) : (
          <ListComponent />
        )}

        <View style={openPopup ? styles.create_popup : {display: 'none'}}>
          <Text style={styles.title_text}>Create a list</Text>
          <TouchableOpacity
            onPress={() => {
              setOpenPopup(false);
            }}
            style={styles.popup_btn_box}>
            <Image
              source={require('../assets/images/x_btn.png')}
              style={styles.close_btn}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input_text}
            onChangeText={text => setPetTitle(text)}
            value={petTitle}
            placeholder="Title"
            placeholderTextColor="#717A7B"
          />
          <TextInput
            style={styles.input_text}
            onChangeText={text => setPetName(text)}
            value={petName}
            placeholder="Name"
            placeholderTextColor="#717A7B"
          />
          <TextInput
            style={styles.input_text}
            onChangeText={text => setPetBreed(text)}
            value={petBreed}
            placeholder="Breed Of Dog"
            placeholderTextColor="#717A7B"
          />
          <View style={styles.input_box}>
            <TextInput
              style={styles.input_text2}
              onChangeText={text => setPetWeight(text)}
              value={petWeight}
              placeholder="Weight"
              placeholderTextColor="#717A7B"
            />
            <TextInput
              style={styles.input_text2}
              onChangeText={text => setPetAge(text)}
              value={petAge}
              placeholder="Age"
              placeholderTextColor="#717A7B"
            />
          </View>
          <View style={styles.input_box}>
            <TouchableOpacity
              style={
                petSex === 'male' ? styles.selected_btn : styles.select_btn
              }
              onPress={() => {
                setPetSex('male');
              }}>
              <Text
                style={{
                  ...styles.select_text,
                  color: petSex === 'male' ? '#031314' : 'white',
                }}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                petSex === 'Female' ? styles.selected_btn : styles.select_btn
              }
              onPress={() => {
                setPetSex('Female');
              }}>
              <Text
                style={{
                  ...styles.select_text,
                  color: petSex === 'Female' ? '#031314' : 'white',
                }}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.input_box}>
            <TouchableOpacity
              style={
                petSex === 'Castrated Male'
                  ? styles.selected_btn
                  : styles.select_btn
              }
              onPress={() => {
                setPetSex('Castrated Male');
              }}>
              <Text
                style={{
                  ...styles.select_text,
                  color: petSex === 'Castrated Male' ? '#031314' : 'white',
                }}>
                Castrated Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                petSex === 'Spayed Female'
                  ? styles.selected_btn
                  : styles.select_btn
              }
              onPress={() => {
                setPetSex('Spayed Female');
              }}>
              <Text
                style={{
                  ...styles.select_text,
                  color: petSex === 'Spayed Female' ? '#031314' : 'white',
                }}>
                Spayed Female
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={addPets}>
            <Text style={styles.complete_btn}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  list_container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  btn_box: {
    width: '100%',
    height: 23,
    display: 'flex',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  btn: {
    width: 23,
    height: '100%',
  },
  empty_text: {
    position: 'absolute',
    top: '50%',
    transform: [{translateX: 0}, {translateY: -15}],
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  create_popup: {
    width: '90%',
    height: '85%',
    marginTop: 20,
    backgroundColor: '#0C2F3D',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1EA3D6',
  },
  title_text: {
    fontSize: 25,
    color: 'white',
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  },
  popup_btn_box: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 25,
    right: 20,
  },
  close_btn: {
    width: '100%',
    height: '100%',
  },
  input_text: {
    width: '90%',
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#1EA3D6',
    backgroundColor: '#031314',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
  input_box: {
    width: '90%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  input_text2: {
    width: '49%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#1EA3D6',
    backgroundColor: '#031314',
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
  select_btn: {
    width: '49%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#031314',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected_btn: {
    width: '49%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#1EA3D6',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  select_text: {
    fontSize: 17,
    fontWeight: '700',
  },
  complete_btn: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1EA3D6',
    marginTop: 40,
  },
});

export default ShowListComponent;
