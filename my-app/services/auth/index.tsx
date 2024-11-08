import axios from "axios";
import { baseURL } from "..";

const login = async (data: any) => {
  try {
    const resp = await axios.post(baseURL + "user/login", data);
    return {
      message: resp.data.message,
      data: resp.data.data,
      status: resp.data.code === 200,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "An error occurred",
        status: false,
      };
    } else {
      return {
        message: "An unexpected error occurred",
        status: false,
      };
    }
  }
};

const vefityOtp = async (data: any) => {
  try {
    const resp = await axios.post(
      baseURL + `user/verify?phone=${data.phone}&otp=${data.otp}`,
      data
    );
    return {
      message: resp.data.message,
      data: resp.data.data,
      status: resp.data.code === 200,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "An error occurred",
        status: false,
      };
    } else {
      return {
        message: "An unexpected error occurred",
        status: false,
      };
    }
  }
};

const register = async (data: any) => {
  try {
    const resp = await axios.post(baseURL + "user/register", data);
    return {
      message: resp.data.message,
      data: resp.data.data,
      status: resp.data.code === 200,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "An error occurred",
        status: false,
      };
    } else {
      return {
        message: "An unexpected error occurred",
        status: false,
      };
    }
  }
};

const sentOTP = async (data: any) => {
  try {
    const resp = await axios.post(baseURL + `user/otp?phone=${data.phone}`);
    return {
      message: resp.data.message,
      data: resp.data.data,
      status: resp.data.code === 200,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "An error occurred",
        status: false,
      };
    } else {
      return {
        message: "An unexpected error occurred",
        status: false,
      };
    }
  }
};

const forgotPassword = async (data: any) => {
  try {
    const resp = await axios.post(
      baseURL + `user/forgot-password?phone=${data.phone}&otp=${data.otp}`
    );
    return {
      message: resp.data.message,
      data: resp.data.data,
      status: resp.data.code === 200,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || "An error occurred",
        status: false,
      };
    } else {
      return {
        message: "An unexpected error occurred",
        status: false,
      };
    }
  }
};

export { login, register, vefityOtp, sentOTP, forgotPassword };
