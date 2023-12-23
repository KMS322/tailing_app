import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const DetailRecordComponent = () => {
  const [notes, setNotes] = useState({
    contents: [
      {id: 1, date: '2023.10.13.금', time: '11:48', title: '특이사항 없음'},
      // {id: 2, date: '2023.10.13.금', time: '12:48', title: '오리랑 싸움2'},
      // {id: 3, date: '2023.10.13.금', time: '13:48', title: '오리랑 싸움3'},
    ],
  });
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.record_box} onPress={() => {}}>
          <View style={styles.record_title}>
            <Image
              source={require('../assets/images/record_image1.png')}
              style={styles.record_title_img1}
            />
            <Text style={styles.record_title_text}>NOTE</Text>
            <Image
              source={require('../assets/images/record_image2.png')}
              style={styles.record_title_img2}
            />
          </View>
          <View style={styles.record_content}>
            {notes.contents.map((content, index) => {
              return (
                <View style={styles.record_lists} key={index}>
                  <Text style={styles.record_content_dot}>·</Text>
                  <Text style={styles.record_content_text}>{content.date}</Text>
                  <Text style={styles.record_content_text}>{content.time}</Text>
                  <Text style={styles.record_content_text}>
                    {content.title}
                  </Text>
                </View>
              );
            })}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.record_box} onPress={() => {}}>
          <View style={styles.record_title}>
            <Image
              source={require('../assets/images/record_image1.png')}
              style={styles.record_title_img1}
            />
            <Text style={styles.record_title_text}>특이사항</Text>
            <Image
              source={require('../assets/images/record_image2.png')}
              style={styles.record_title_img2}
            />
          </View>
          <View style={styles.record_content}>
            {notes.contents.map(content => {
              return (
                <View style={styles.record_lists}>
                  <Text style={styles.record_content_dot}>·</Text>
                  <Text style={styles.record_content_text}>{content.date}</Text>
                  <Text style={styles.record_content_text}>{content.time}</Text>
                  <Text style={styles.record_content_text}>
                    {content.title}
                  </Text>
                </View>
              );
            })}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.86,
    height: '100%',
    flex: 1,
    marginTop: 29,
  },
  record_box: {
    width: '100%',
    height: 123,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginBottom: 22,
  },
  record_title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 12,
  },
  record_title_img1: {
    width: 20,
    height: 7,
  },
  record_title_text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginLeft: 9,
  },
  record_title_img2: {
    width: 11,
    height: 11,
    marginLeft: 12,
  },
  record_content: {
    marginTop: 10,
    marginLeft: 22,
  },
  record_lists: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  record_content_dot: {
    fontSize: 12,
    color: '#12B6D1',
    marginRight: 8,
  },
  record_content_text: {
    fontSize: 12,
    color: '#717171',
    marginRight: 8,
  },
});
export default DetailRecordComponent;
