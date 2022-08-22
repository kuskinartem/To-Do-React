import axios from "axios";
import { url } from "../constants";

export const getTask = () => axios.get(url);

export const addTasks = (text) => axios.post(url, { text });

export const deleteTask = (_id) => axios.delete(`${url}/${_id}`);

export const deleteTasks = () => axios.delete(`${url}`)

export const changeCheckbox= ({_id,  isCheck }) => axios.patch(`${url}/${_id}/checkbox`, { isCheck });

export const changeText = ({_id,  text }) => axios.patch(`${url}/${_id}`, { text });