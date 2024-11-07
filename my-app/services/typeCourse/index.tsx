import axios from "axios";
import { baseURL } from "..";

const getAllTypeCourses = async () => {
  try {
    const resp = await axios.get(baseURL + "type-courses/all");
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

export { getAllTypeCourses };
