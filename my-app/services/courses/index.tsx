import axios from "axios";
import { baseURL } from "..";

const getAllCourses = async () => {
  try {
    const resp = await axios.get(baseURL + "courses/all");
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

const getAllCoursesByType = async (type: any) => {
  try {
    const resp = await axios.get(baseURL + `courses/course-type/${type}`);
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

const getDetailCourse = async (id: any) => {
  try {
    const resp = await axios.get(baseURL + `courses/course/${id}`);
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

export { getAllCourses, getAllCoursesByType, getDetailCourse };
