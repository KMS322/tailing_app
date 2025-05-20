import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../Component/constant/contants';
import { getToken } from '../utils/storage';

interface DeviceStore {
  checkLoading: boolean;
  checkError: string | null;
  checkSuccess: boolean;
  signupLoading: boolean;
  signupError: string | null;
  signupSuccess: boolean;
  checkCode: (deviceCode: string) => Promise<void>;
  signup: (params: {
    deviceCode: string;
    org_name: string;
    org_address: string;
    org_id: string;
    org_pw: string;
    org_phone: string;
    org_email: string;
  }) => Promise<void>;
  offCheckSuccess: () => void;
}

export const deviceStore = create<DeviceStore>((set, get) => ({
  checkLoading: false,
  checkError: null,
  checkSuccess: false,
  signupLoading: false,
  signupError: null,
  signupSuccess: false,
  checkCode: async (deviceCode: string) => {
    try {
      set({ checkLoading: true, checkError: null });
      const response = await axios.post(`${API_URL}/device/check`, { deviceCode });
      
      if (response.status === 200) {
        set({ checkSuccess: true });
        const token = await getToken();
        if (!token) {
          throw new Error('토큰이 없습니다.');
        }
      }
    } catch (error) {
      set({
        checkError: error.response.data.message,
        checkLoading: false
      });
      console.error(error);
    }
  },
  signup: async ({ deviceCode, org_name, org_address, org_id, org_pw, org_phone, org_email }) => {
    try {
      set({ signupLoading: true, signupError: null, signupSuccess: false });
      const response = await axios.post(`${API_URL}/user/signup`, {
        deviceCode,
        org_name,
        org_address,
        org_id,
        org_pw,
        org_phone,
        org_email
      });
      if (response.status === 201) {
        set({ signupLoading: false, signupError: null, signupSuccess: true, checkSuccess:false });
      } else {
        set({ signupLoading: false, signupError: response.data.message, signupSuccess: false });
      }
    } catch (error) {
      let errorMsg = '회원가입에 실패했습니다.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }
      set({ signupLoading: false, signupError: errorMsg, signupSuccess: false });
      throw new Error(errorMsg);
    }
  },
  offCheckSuccess: () => {
    set({ checkSuccess: false });
  }
}));