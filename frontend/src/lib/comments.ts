import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const createComment = async (
  formData: { comment_by: string; body: string },
  postId: string,
  successCallback: () => void,
) => {
  try {
    const post = await axiosInstance.post(
      `/posts/${postId}/comments`,
      formData,
    );
    successCallback();
    toast.success(post.data.message);
  } catch (err) {
    console.error(err);
  }
};

export { createComment };
