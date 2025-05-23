import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

type TermsModalProps = {
  visible: boolean;
  type: 'privacy' | 'terms' | 'agreement';
  onClose: () => void;
  onAgree?: (agreementInfo: {
    marketingAgreed: boolean;
    smsAgreed: boolean;
    emailAgreed: boolean;
    pushAgreed: boolean;
  }) => void;
};

const TermsModal = ({ visible, type, onClose, onAgree }: TermsModalProps) => {
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [smsAgreed, setSmsAgreed] = useState(false);
  const [emailAgreed, setEmailAgreed] = useState(false);
  const [pushAgreed, setPushAgreed] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);
  const [showPrivacyFull, setShowPrivacyFull] = useState(false);
  const [showTermsFull, setShowTermsFull] = useState(false);
  const [showMarketingFull, setShowMarketingFull] = useState(false);

  useEffect(() => {
    if (allAgreed) {
      setPrivacyAgreed(true);
      setTermsAgreed(true);
      setMarketingAgreed(true);
      setSmsAgreed(true);
      setEmailAgreed(true);
      setPushAgreed(true);
    }
  }, [allAgreed]);

  useEffect(() => {
    if (privacyAgreed && termsAgreed && marketingAgreed && smsAgreed && emailAgreed && pushAgreed) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
  }, [privacyAgreed, termsAgreed, marketingAgreed, smsAgreed, emailAgreed, pushAgreed]);

  const handleAllAgree = () => {
    const newAllAgreed = !allAgreed;
    setAllAgreed(newAllAgreed);
    setPrivacyAgreed(newAllAgreed);
    setTermsAgreed(newAllAgreed);
    setMarketingAgreed(newAllAgreed);
    setSmsAgreed(newAllAgreed);
    setEmailAgreed(newAllAgreed);
    setPushAgreed(newAllAgreed);
  };

  const marketingPolicy = `마케팅 목적의 개인정보 수집 및 이용 동의

1. 수집하는 개인정보 항목
- 필수항목: 아이디, 비밀번호, 이메일 주소
- 선택항목: 전화번호, 반려동물 정보

2. 개인정보의 수집 및 이용목적
- 신규 서비스 개발 및 마케팅
- 이벤트 및 프로모션 안내
- 서비스 이용에 대한 통계 분석
- 맞춤형 서비스 제공

3. 개인정보의 보유 및 이용기간
- 회원 탈퇴 시까지 또는 동의 철회 시까지

4. 동의 거부권 및 동의 거부에 따른 불이익
- 동의를 거부하실 수 있으며, 동의 거부 시 마케팅 정보 수신이 제한됩니다.`;

  const privacyPolicy = `1. 수집하는 개인정보 항목
- 필수항목: 아이디, 비밀번호, 이메일 주소
- 선택항목: 반려동물 정보 (이름, 종류, 생년월일 등)

2. 개인정보의 수집 및 이용목적
- 회원 가입 및 관리
- 서비스 제공 및 운영
- 반려동물 건강 모니터링 서비스 제공
- 고객 문의 및 불만 처리

3. 개인정보의 보유 및 이용기간
- 회원 탈퇴 시까지 또는 법정 보유기간

4. 개인정보의 제3자 제공
- 법령에 따른 규정이나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우

5. 이용자의 권리와 행사방법
- 개인정보 열람 요구
- 오류 정정 요구
- 삭제 요구
- 처리정지 요구

6. 개인정보 보호책임자
- 이름: 홍길동
- 직위: 개인정보보호책임자
- 연락처: privacy@creamoff.com`;

  const termsOfService = `1. 서비스 이용
- 본 서비스는 회원 가입 후 이용 가능합니다.
- 서비스 이용은 24시간 가능하며, 시스템 점검 등으로 일시 중단될 수 있습니다.

2. 회원의 의무
- 회원은 본인의 개인정보를 정확하게 제공해야 합니다.
- 회원은 서비스 이용 시 관련 법령을 준수해야 합니다.
- 회원은 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.

3. 서비스 제공
- 반려동물 건강 모니터링 서비스
- 건강 데이터 분석 및 리포트 제공
- 커뮤니티 서비스

4. 서비스 이용 제한
- 법령 및 약관을 위반하는 경우
- 서비스의 정상적인 운영을 방해하는 경우
- 타인의 권리를 침해하는 경우

5. 책임 제한
- 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등으로 인한 서비스 중단
- 회원의 귀책사유로 인한 서비스 이용 장애

6. 분쟁 해결
- 본 약관과 관련하여 분쟁이 발생할 경우, 회사와 회원은 상호 협의하여 해결합니다.
- 협의가 이루어지지 않을 경우, 관련 법령에 따라 해결합니다.`;

  const renderAgreementContent = () => {
    if (type !== 'agreement') {
      return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.content}>
            {type === 'privacy' ? privacyPolicy : termsOfService}
          </Text>
        </ScrollView>
      );
    }

    return (
      <View style={styles.agreementContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.agreementSection}>
            <View style={styles.agreementHeader}>
              <Text style={styles.agreementTitle}>개인정보 처리방침</Text>
              <TouchableOpacity onPress={() => setShowPrivacyFull(!showPrivacyFull)}>
                <Text style={styles.viewFullText}>{showPrivacyFull ? '닫기' : '전문보기'}</Text>
              </TouchableOpacity>
            </View>
            {showPrivacyFull && (
              <View style={styles.agreementScrollView}>
                <ScrollView nestedScrollEnabled={true} style={{maxHeight: 200}}>
                  <Text style={styles.fullTextTitle}>크림오프 개인정보 처리방침</Text>
                  <Text style={styles.content}>{privacyPolicy}</Text>
                </ScrollView>
              </View>
            )}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setPrivacyAgreed(!privacyAgreed)}
            >
              <View style={[styles.checkbox, privacyAgreed && styles.checkboxChecked]}>
                {privacyAgreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>(필수) 개인정보 처리방침에 동의합니다.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.agreementSection}>
            <View style={styles.agreementHeader}>
              <Text style={styles.agreementTitle}>이용약관</Text>
              <TouchableOpacity onPress={() => setShowTermsFull(!showTermsFull)}>
                <Text style={styles.viewFullText}>{showTermsFull ? '닫기' : '전문보기'}</Text>
              </TouchableOpacity>
            </View>
            {showTermsFull && (
              <View style={styles.agreementScrollView}>
                <ScrollView nestedScrollEnabled={true} style={{maxHeight: 200}}>
                  <Text style={styles.fullTextTitle}>크림오프 이용약관</Text>
                  <Text style={styles.content}>{termsOfService}</Text>
                </ScrollView>
              </View>
            )}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setTermsAgreed(!termsAgreed)}
            >
              <View style={[styles.checkbox, termsAgreed && styles.checkboxChecked]}>
                {termsAgreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>(필수) 이용약관에 동의합니다.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.agreementSection}>
            <View style={styles.agreementHeader}>
              <Text style={styles.agreementTitle}>마케팅 목적의 개인정보 수집 및 이용 동의</Text>
              <TouchableOpacity onPress={() => setShowMarketingFull(!showMarketingFull)}>
                <Text style={styles.viewFullText}>{showMarketingFull ? '닫기' : '전문보기'}</Text>
              </TouchableOpacity>
            </View>
            {showMarketingFull && (
              <View style={styles.agreementScrollView}>
                <ScrollView nestedScrollEnabled={true} style={{maxHeight: 200}}>
                  <Text style={styles.content}>{marketingPolicy}</Text>
                </ScrollView>
              </View>
            )}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setMarketingAgreed(!marketingAgreed)}
            >
              <View style={[styles.checkbox, marketingAgreed && styles.checkboxChecked]}>
                {marketingAgreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>(선택) 마케팅 목적의 개인정보 수집 및 이용에 동의합니다.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.agreementSection}>
            <Text style={styles.agreementTitle}>광고성 정보 수신 동의</Text>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => setSmsAgreed(!smsAgreed)}>
                <View style={[styles.checkbox, smsAgreed && styles.checkboxChecked]}>
                  {smsAgreed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>(선택) SMS 수신 동의</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => setEmailAgreed(!emailAgreed)}>
                <View style={[styles.checkbox, emailAgreed && styles.checkboxChecked]}>
                  {emailAgreed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>(선택) 이메일 수신 동의</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => setPushAgreed(!pushAgreed)}>
                <View style={[styles.checkbox, pushAgreed && styles.checkboxChecked]}>
                  {pushAgreed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxText}>(선택) 앱푸시 수신 동의</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.allAgreeButton}
            onPress={handleAllAgree}
          >
            <View style={[styles.checkbox, allAgreed && styles.checkboxChecked]}>
              {allAgreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.allAgreeText}>전체 동의</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.agreeButton,
              (!privacyAgreed || !termsAgreed) && styles.agreeButtonDisabled
            ]}
            onPress={() => {
              if (onAgree) {
                onAgree({
                  marketingAgreed,
                  smsAgreed,
                  emailAgreed,
                  pushAgreed
                });
              }
            }}
            disabled={!privacyAgreed || !termsAgreed}
          >
            <Text style={styles.agreeButtonText}>동의하고 계속하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, type === 'agreement' && styles.agreementModalContent]}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {type === 'privacy' ? '개인정보 처리방침' :
                type === 'terms' ? '이용약관' : '약관 동의'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          {renderAgreementContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  agreementModalContent: {
    height: Dimensions.get('window').height * 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F0663F',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  content: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333',
    textAlign: 'left',
  },
  agreementContainer: {
    flex: 1,
  },
  agreementSection: {
    marginBottom: 32,
  },
  agreementHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  agreementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5B75C',
    marginBottom: 2,
  },
  agreementScrollView: {
    height: 200,
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#F5B75C',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 0,
  },
  checkboxChecked: {
    backgroundColor: '#F5B75C',
    borderColor: '#F5B75C',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
    includeFontPadding: false,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  agreeButton: {
    backgroundColor: '#F0663F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  agreeButtonDisabled: {
    backgroundColor: '#ccc',
  },
  agreeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    
  },
  allAgreeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    padding: 10,
    
  },
  allAgreeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewFullText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textDecorationLine: 'underline',
  },
  fullTextTitle: {
    color: '#F5B75C',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default TermsModal;