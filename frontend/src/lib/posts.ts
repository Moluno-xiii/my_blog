import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { handleError } from "./helpers";

const getPostById = async (id: string) => {
  try {
    const post = await axiosInstance(`/posts/${id}`);
    return post;
  } catch (err) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

const getDraftById = async (id: string) => {
  try {
    const post = await axiosInstance.get(`/posts/drafts/${id}`);
    return post;
  } catch (err: unknown) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

const deletePost = async (post_id: string, sucessCb: () => void) => {
  try {
    const data = await axiosInstance.delete(`/admin/delete-post/${post_id}`);
    sucessCb();
    toast.success(data.data.message);
  } catch (err) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

const getAllDrafts = async () => {
  try {
    const drafts = await axiosInstance.get("/posts/drafts");
    return drafts;
  } catch (err: unknown) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

const getAllPosts = async () => {
  try {
    const posts = await axiosInstance.get("/posts");
    return posts;
  } catch (err: unknown) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

const createPost = async (
  updatedData: { title: string; body: string; isPostDraft: boolean },
  succcessCallback: () => void,
) => {
  try {
    const post = await axiosInstance.post("/admin/create-post", updatedData);
    toast.success(post.data.message);
    succcessCallback();
  } catch (err: unknown) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

const updatePost = async (
  updatedData: { title: string; body: string; isPostDraft: boolean },
  succcessCallback: () => void,
  postId: string,
) => {
  try {
    const updatedPost = await axiosInstance.put(
      `/admin/update-post/${postId}`,
      updatedData,
    );
    toast.success(updatedPost.data.message);
    succcessCallback();
  } catch (err: unknown) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

const getSinglePost = async (postId: string) => {
  try {
    const data = await axiosInstance.get(`/posts/singlePost/${postId}`);
    return data;
  } catch (err) {
    const message = handleError(err, "response");
    toast.error(message);
  }
};

export {
  getPostById,
  getDraftById,
  deletePost,
  getAllDrafts,
  getAllPosts,
  createPost,
  updatePost,
  getSinglePost,
};
