import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Header from './header';
import ConfirmModal from './modal/confirmModal';
import MessageModal from './modal/messageModal';
import { orgStore } from '../store/orgStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MypageOut = () => {
  const { deleteOrg, deleteOrgLoading, deleteOrgError, deleteOrgSuccess, offDeleteOrgSuccess, offDeleteOrgError, logout, logoutLoading, logoutError, logoutSuccess, offLogoutSuccess, offLogoutError } = orgStore();
  const navigation = useNavigation<NavigationProp>();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [modalObject, setModalObject] = useState({
    visible: false,
    title: '',
    content: '',
    confirmText: '',
    cancelText: '',
    action: 'logout' as 'logout' | 'withdrawal'
  });

  const handleLogout = async() => {
    try {
      await logout();
      setOpenMessageModal(true);
      offLogoutSuccess();
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      offLogoutError();
    }
  };

  const handleDelete = async() => {
    try {
      await deleteOrg();
      setOpenMessageModal(true);
      offDeleteOrgSuccess();
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      offDeleteOrgError();
    }
  };

  const handleConfirm = async () => {
    if (modalObject.action === 'logout') {
      await handleLogout();
    } else {
      await handleDelete();
    }
    setOpenConfirmModal(false);
  };

  return (
    <>
    <Header title="개인 설정" />
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]} 
          onPress={() => {
            setModalObject({
              visible: true,
              title: '로그아웃',
              content: '로그아웃 하시겠습니까?',
              confirmText: '로그아웃',
              cancelText: '취소',
              action: 'logout'
            })
            setOpenConfirmModal(true);
          }}
        >
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.withdrawalButton]} 
          onPress={() => {
            setModalObject({
              visible: true,
              title: '회원탈퇴',
              content: '회원탈퇴 하시겠습니까?',
              confirmText: '회원탈퇴',
              cancelText: '취소',
              action: 'withdrawal'
            })
            setOpenConfirmModal(true);
          }}
        >
          <Text style={[styles.buttonText, styles.withdrawalText]}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    <ConfirmModal
      visible={openConfirmModal}
      title={modalObject.title}
      content={modalObject.content}
      confirmText={modalObject.confirmText}
      cancelText={modalObject.cancelText}
      onCancel={() => setOpenConfirmModal(false)}
      onConfirm={handleConfirm}
    />
    <MessageModal
      visible={openMessageModal}
      title={"안내"}
      content={"로그인 화면으로 이동합니다."}
      onClose={() => setOpenMessageModal(false)}
    />
    </>
  );
}   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
  },
  withdrawalButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  withdrawalText: {
    color: '#ff4444',
  },
});

export default MypageOut;