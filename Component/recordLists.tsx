import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { dataStore } from '../store/dataStore';
import AlertModal from './modal/alertModal';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const RecordLists = ({selectedDate, selectedPetCode, label}: {selectedDate: string, selectedPetCode: string, label: string}) => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const { csvLists, downCSV, downCsvSuccess, resetDownCsvSuccess } = dataStore();
  const date_time = csvLists.map((list)=> list.file_name.split("_")[2].split(".")[0].split("-"));
  const dates = date_time.map((list)=> list[0]);
  const times = date_time.map((list)=> list[1]);
  const formattedTimes = times.map(time => 
    dayjs(time, "HHmmss").format("HH:mm:ss")
  );
  const handleDownload = async(list) => {
    try {
      await downCSV(list.file_name, label);
    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (downCsvSuccess) {
      setOpenAlertModal(true);  
      resetDownCsvSuccess();
    }
  }, [downCsvSuccess])

  return (
    <>
    <ScrollView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.listContainer}>
          {csvLists.map((list, index) => (
            <View
              key={index}
              style={styles.listItem}
            >
              <View style={styles.listInfo}>
                <Text style={styles.listDate}>수집 시작 일시 : {dayjs(dates[index]).format('YYYY-MM-DD')} {formattedTimes[index]}</Text>
                <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(list)}><Text>다운로드</Text></TouchableOpacity>
              </View>
            </View>
          ))}
    
   
        </View>
      </ScrollView>
    </ScrollView>
    <AlertModal
      visible={openAlertModal}
      onClose={() => setOpenAlertModal(false)}
      title="다운로드 완료"
      content="Downloads 폴더에서 확인하세요."
    />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'red',
  },
  scrollView: {
    width: '100%',
    height: 'auto',
    overflow: 'scroll',
  },
  listContainer: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    height: 70,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  listInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  listDate: {
    fontSize: 14,
    color: '#666',
  },
  downloadIcon: {
    width: 24,
    height: 24,
    marginLeft: 12,
  },
});

export default RecordLists;