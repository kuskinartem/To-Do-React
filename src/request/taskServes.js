import axios from "axios";
import { url } from "../constants";

export const getTask =  () =>  axios.get(url);

export const addTasks =  (text) =>  axios.post(url, { text });

export const deleteTask =  (_id) =>  axios.delete(`${url}/${_id}`);

export const changeIsCheckData =  (_id, isCheck) =>  axios.patch(`${url}/${_id}/checkbox`, { isCheck: !isCheck });

export const changeText =  (_id, currentTodo) =>  axios.patch(`${url}/${_id}`, {text: currentTodo.text});