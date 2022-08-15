import axios from "axios";
import { url } from "../constants";

export const getTask = async () => await axios.get(url);
export const addTask = async (text) => await axios.post(url, { text });
export const deleteTask = async (_id) => await axios.delete(`${url}/${_id}`);
export const changeIsCheck = async (_id, isCheck) => await axios.patch(`${url}/${_id}/checkbox`, { isCheck: !isCheck });
export const changeText = async (_id, currentTodo) => await axios.patch(`${url}/${_id}`, {text: currentTodo.text});