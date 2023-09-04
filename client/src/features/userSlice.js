import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';
import useProfilPicture from '../hooks/useProfilPicture';
import useUpdateUsersInformation from '../hooks/useUpdateUsersInformation';
import useUpdateUsersPassword from '../hooks/useUpdateUsersPassword';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
  errorMessage: '',
  profilPicture: '',
  role:'',
};

export const profilPictureUser = createAsyncThunk(
  'user/profilPictureUser',
  async (formData) => {
    const profilPicture = useProfilPicture();
    return profilPicture(formData).then(
      (res) => res
    );
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (infosConnexion) => {
    const login = useLogin();
    return login(infosConnexion.email, infosConnexion.password).then(
      (res) => res
    );
  },
);


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (infosRegister) => {
    const register = useRegister();
    return register(
      infosRegister.firstName,
      infosRegister.lastName,
      infosRegister.email,
      infosRegister.password,
      infosRegister.passwordConfirm
    ).then((res) => res);
  }
);

export const updateUsersInformation = createAsyncThunk(
  'user/updateUsersInformation',
  async (infosUpdateInformation) => {
    const updateInformation = useUpdateUsersInformation();
    return updateInformation(
      infosUpdateInformation.newFirstName,
      infosUpdateInformation.newLastName,
      infosUpdateInformation.newEmail,
      infosUpdateInformation.id,

    ).then((res) => res);
  }
);

export const updateUsersPassword = createAsyncThunk(
  'user/updateUsersPassword',
  async (infosUpdatePassword) => {
    const updatePassword = useUpdateUsersPassword();
    return updatePassword(
      infosUpdatePassword.email,
      infosUpdatePassword.newPassword,
      infosUpdatePassword.newPasswordConfirm,
      infosUpdatePassword.id,

    ).then((res) => res);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
    disconnect: (state) => {
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profilPictureUser.fulfilled, (state, action) => {
      console.log(action.payload)
      if(action.payload.message !== undefined){
        state.errorMessage = action.payload.message;
      }else{
        /* state.profilPicture = action.payload.user.profilPicture; */
        state.errorMessage = ''
      }
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if(action.payload.message !== undefined){
        state.errorMessage = action.payload.message;
      }else{
        state.firstName = action.payload.user.firstName;
        state.lastName = action.payload.user.lastName;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.id = action.payload.user.id;
        state.role = action.payload.user.role;
        state.errorMessage = ''
      }
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if(action.payload.message !== undefined){
        state.errorMessage = action.payload.message;
      }else{
        state.firstName = action.payload.user.firstName;
        state.lastName = action.payload.user.lastName;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.id = action.payload.user.id;
        state.role = action.payload.user.role;
        state.errorMessage = ''
      }
    });
    builder.addCase(updateUsersInformation.fulfilled, (state, action) => {
      if(action.payload.message !== undefined){
        state.errorMessage = action.payload.message;
      }else{
        state.firstName = action.payload.user.firstName;
        state.lastName = action.payload.user.lastName;
        state.email = action.payload.user.email;
        state.id = action.payload.user.id;
        state.errorMessage = ''
      }
    });
    builder.addCase(updateUsersPassword.fulfilled, (state, action) => {
      if(action.payload.message !== undefined){
        state.errorMessage = action.payload.message;
      }else{
        state.firstName = action.payload.user.firstName;
        state.lastName = action.payload.user.lastName;
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.id = action.payload.user.id;
        state.role = action.payload.user.role;
        state.errorMessage = ''
      }
    });
  },
});

export const { increment, login, disconnect } = userSlice.actions;
export default userSlice.reducer;
