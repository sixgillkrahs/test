import axios from "axios";
import { baseURL } from "..";

const getUserDetail = async ({ id }: { id: string }) => {
  try {
    const resp = await axios.get(baseURL + `user/detail?id=${id}`);
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

const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: { username: string; password: string };
}) => {
  try {
    const resp = await axios.put(baseURL + `user/detail/${id}`, data);
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

export { getUserDetail, updateUser };
