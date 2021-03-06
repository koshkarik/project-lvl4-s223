import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const deleteChannel = createAction('CHANNEL_DELETE');
export const addNewChannel = createAction('CANNEL_ADD');
export const getChannels = createAction('CHANNELS_GET');
export const renameChannel = createAction('CHANNEL_RENAME');
export const getUserName = createAction('USER_NAME_GET');
export const setActiveChannel = createAction('ACTIVE_CHANNEL_SET');
export const addNewMessage = createAction('NEW_MESSAGE_ADD');
export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');
export const handleModalError = createAction('MODAL_ERROR_HANDLE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = ({ name }, resetInputFunc) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const attributes = { name, removable: true };
    await axios.post(routes.channelsUrl(), { data: { attributes } });
    resetInputFunc();
    dispatch(addChannelSuccess());
    dispatch(closeModal());
  } catch (e) {
    console.log(e);
    dispatch(addChannelFailure());
    dispatch(handleModalError());
  }
};

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

export const removeChannel = id => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    await axios.delete(routes.deleteOrEditChannelUrl(id));
    dispatch(deleteChannelSuccess());
    dispatch(closeModal());
  } catch (e) {
    console.log(e);
    dispatch(deleteChannelFailure());
    dispatch(handleModalError());
  }
};

export const editChannelRequest = createAction('CHANNEL_EDIT_REQUEST');
export const editChannelSuccess = createAction('CHANNEL_EDIT_SUCCESS');
export const editChannelFailure = createAction('CHANNEL_EDIT_FAILURE');

export const editChannel = ({ id, name }, resetInputFunc) => async (dispatch) => {
  dispatch(editChannelRequest());
  try {
    await axios.patch(routes.deleteOrEditChannelUrl(id), { data: { attributes: { name } } });
    resetInputFunc();
    dispatch(editChannelSuccess());
    dispatch(closeModal());
  } catch (e) {
    console.log(e);
    dispatch(editChannelFailure());
  }
};

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message, author, channel }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const date = new Date();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const time = `${hours}:${minutes}`;
    const attributes = {
      message, author, channel, time,
    };
    await axios.post(routes.messagesUrl(channel), { data: { attributes } });
    dispatch(addMessageSuccess());
  } catch (e) {
    dispatch(addMessageFailure());
  }
};
