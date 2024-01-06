import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const TestComponent = () => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState('');
  const formatDateTime = (date: Date): string => {
    const updatedDate = new Date(date);
    updatedDate.setHours(date.getHours() + 9);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return updatedDate.toLocaleString('ko-KR', options);
  };

  const handleButtonClick = () => {
    const formattedTime = formatDateTime(new Date());
    // console.log(`Current Time in Korea: ${formattedTime}`);
    return formattedTime;
  };
  const [completeData, setCompleteData] = useState<
    {time: string; ppg: number; pulse: number; factor: number}[]
  >([]);
  const showObject = () => {
    const randomNum1 = Math.floor(Math.random() * 100) + 1;
    const randomNum2 = Math.floor(Math.random() * 100) + 1;
    const randomNum3 = Math.floor(Math.random() * 100) + 1;
    const dataTime = handleButtonClick();
    setCompleteData(prevData => [
      ...prevData,
      {
        time: dataTime.toLocaleString(),
        ppg: randomNum1,
        pulse: randomNum2,
        factor: randomNum3,
      },
    ]);
    setCurrentTime(dataTime.toLocaleString());
    console.log('completeData : ', completeData);
  };
  const sendObject = async () => {
    const apiUrl = 'http://10.0.2.2:8001/object';
    // const apiUrl = 'http://27.96.128.206:8001/object';
    // const apiUrl = 'http://115.85.183.166:8001/object';
    try {
      const response = await axios.post(apiUrl, completeData);

      if (response.status === 200) {
        Alert.alert('Success Message', 'send success');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      if (error.response) {
        // 서버로부터 응답을 받았으나, 응답 코드가 2xx가 아닌 경우
        Alert.alert(
          'Error',
          `Server responded with status ${error.response.status}`,
        );
      } else if (error.request) {
        // 요청을 보냈지만 응답을 받지 못한 경우
        Alert.alert('Error', 'No response received from the server');
      } else {
        // 오류를 발생시킨 요청 자체에 문제가 있는 경우
        Alert.alert('Error', 'Request failed:', error.message);
      }
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.body}>
        <Pressable
          style={styles.scanButton}
          onPress={handleButtonClick}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>버튼</Text>
        </Pressable>
        <Pressable
          style={styles.scanButton}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>ggg</Text>
        </Pressable>
        <Pressable
          style={styles.scanButton}
          onPress={showObject}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>객체 출력</Text>
        </Pressable>
        <Pressable
          style={styles.scanButton}
          onPress={sendObject}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>보내기</Text>
        </Pressable>
        <Pressable
          style={styles.scanButton}
          onPress={() => {
            navigation.navigate('ConnectBle');
          }}
          android_ripple={{color: 'lightgray'}}>
          <Text style={styles.scanButtonText}>connect ble</Text>
        </Pressable>
        {completeData.map((number, index) => {
          return (
            <React.Fragment key={index}>
              <Text style={{...styles.scanButtonText, fontSize: 30}}>
                {number.time}
              </Text>
              <Text style={{...styles.scanButtonText, fontSize: 30}}>
                {number.ppg}
              </Text>
              <Text style={{...styles.scanButtonText, fontSize: 30}}>
                {number.pulse}
              </Text>
              <Text style={{...styles.scanButtonText, fontSize: 30}}>
                {number.factor}
              </Text>
            </React.Fragment>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    // backgroundColor: 'white',
    alignItems: 'center',
  },
  scanButton: {
    width: 207,
    // width: '100%',
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#12B6D1',
    marginTop: 22,
    borderRadius: 6,
  },
  scanButtonText: {
    fontSize: 12,
    color: 'white',
  },
});

export default TestComponent;
