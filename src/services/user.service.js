// user related api calls
import { privateAxios, publicAxios } from "./axios.service";

//register new user
export const registerUser = (userData) => {
  return publicAxios.post(`/users`, userData).then((response) => response.data);
};

//login user
export const loginUser = (loginData) => {
  return publicAxios
    .post(`/auth/login`, loginData)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return publicAxios.get(`/users/${userId}`).then((response) => response.data);
};

//update user

export const updateUser = (user) => {
  return privateAxios
    .put(`/users/${user.userId}`, user)
    .then((response) => response.data);
};

//
// update profile pic

export const updateProfilePic = (file, userId) => {
  const formData = new FormData();
  formData.append("userImage", file);

  return privateAxios
    .post(`/users/image/${userId}`, formData)
    .then((response) => response.data);
};
