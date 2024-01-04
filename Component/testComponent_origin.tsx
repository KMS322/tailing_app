import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';
const TestComponent = () => {
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
    try {
      console.log('AA');
      const response = await axios.post(
        'http://10.0.2.2:8001/object',
        completeData,
        {
          headers: {
            'Content-Type': 'application/json',
            // 다른 헤더도 필요하다면 추가 가능
          },
        },
      );
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
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
          <Text style={styles.scanButtonText}>1</Text>
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
        {/* {completeData.map((number, index) => {
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
        })} */}
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
