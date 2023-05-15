//rxslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrStudents: [
    {
      id: "100001",
      name: "Nguyễn Văn A",
      phone: "1234567890",
      email: "nguyenvan@gmail.com",
    },
    {
      id: "100002",
      name: "Nguyễn Văn B",
      phone: "0987654321",
      email: "nguyenvanb@gmail.com",
    },
    {
      id: "100003",
      name: "Nguyễn Văn C",
      phone: "9876543210",
      email: "nguyenvanc@gmail.com",
    },
    {
      id: "100004",
      name: "Nguyễn Văn D",
      phone: "0123456789",
      email: "nguyenvand@gmail.com",
    },
    {
      id: "100005",
      name: "Nguyễn Văn E",
      phone: "9998887776",
      email: "nguyenvane@gmail.com",
    },
  ],
  studentInput: {
    id: "",
    name: "",
    phone: "",
    email: "",
  },
  errMessage: {
    all: "",
    id: "",
    name: "",
    phone: "",
    email: "",
  },
  isValid: {
    isValid: false,
    id: true,
    name: true,
    phone: true,
    email: true,
  },
  searchInput: "",
  arrStudentFilter: [
    {
      id: "",
      name: "",
      phone: "",
      email: "",
    },
  ],
};

const formReduxReducer = createSlice({
  name: "formReduxReducer",
  initialState,
  reducers: {
    saveStudentAction: (state, action) => {
      const { id } = action.payload;
      const { arrStudents, isValid } = state;

      console.log(isValid.isValid);

      if (isValid.isValid) {
        const index = arrStudents.findIndex((student) => student.id === id);

        if (index !== -1) {
          arrStudents[index] = action.payload;
          alert(
            `Successfully updated the data of the student with the student ID ${id}`
          );
        } else {
          arrStudents.push(action.payload);
          alert(
            `Successfully added the data of the student with the student ID ${id}`
          );
        }
      } else {
        alert(`Please verify the validity of the data again.`);
      }

      state.studentInput.id = "";
      state.studentInput.name = "";
      state.studentInput.phone = "";
      state.studentInput.email = "";
    },

    updateStudentInput: (state, action) => {
      const { id, value } = action.payload;

      console.log(action);
      state.studentInput[id] = value;

      if (id === "id") {
        if (value.trim() === "") {
          state.isValid.id = false;
          state.errMessage.id = "The ID is empty.";
        } else if (!/^[a-zA-Z0-9]{6,12}$/.test(value)) {
          state.isValid.id = false;
          state.errMessage.id =
            "The ID only contains alphanumeric characters (a-z, A-Z, 0-9), and it has a length of 6 to 12 characters.";
        } else {
          state.isValid.id = true;
        }
      }

      if (id === "name") {
        const isNameValid =
          value.trim() !== "" &&
          value.length >= 3 &&
          value.length <= 50 &&
          /\p{Letter}/u.test(value);

        state.isValid.name = isNameValid;
        if (!isNameValid) {
          state.errMessage.name =
            "Name must be 3-50 characters long and only contain letters, spaces, and hyphens";
        }
      }

      if (id === "phone") {
        const isPhoneValid =
          value.trim() !== "" && /^[0-9]{10,11}$/.test(value);

        state.isValid.phone = isPhoneValid;
        if (!isPhoneValid) {
          state.errMessage.phone =
            "Phone only contains digits (0-9) and has a length of 10 to 11 characters.";
        }
      }

      if (id === "email") {
        const isEmailValid =
          value.trim() !== "" &&
          value
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        state.isValid.email = isEmailValid;
        if (!isEmailValid) {
          state.errMessage.email = "Invalid email address!";
        }
      }
      state.isValid.isValid =
        state.isValid.id &&
        state.isValid.name &&
        state.isValid.phone &&
        state.isValid.email;
    },
    deleteStudentAction: (state, action) => {
      let id = action.payload;
      console.log("🚀 ~ file: formReduxReducer.jsx:147 ~ id:", id);
      let indexDel = state.arrStudents.findIndex(
        (student) => student.id === id
      );
      if (indexDel !== -1) {
        state.arrStudents.splice(indexDel, 1);
      }

      console.log("🚀 ~ file: formReduxReducer.jsx:151 ~ indexDel:", indexDel);
    },

    updateStudentAction: (state, action) => {
      let id = action.payload;
      console.log("🚀 ~ file: formReduxReducer.jsx:147 ~ id:", id);
      let indexUpdate = state.arrStudents.findIndex(
        (student) => student.id === id
      );

      state.stateUpdate = true;

      state.studentInput = state.arrStudents[indexUpdate];

      console.log(
        "🚀 ~ file: formReduxReducer.jsx:159 ~ indexUpdate:",
        indexUpdate
      );
    },

    updateSearchInput: (state, action) => {
      const { id, value } = action.payload;

      console.log(action);
      state.searchInput = value;
    },
    claerFormAction: (state, action) => {
      state.studentInput.id = "";
      state.studentInput.name = "";
      state.studentInput.phone = "";
      state.studentInput.email = "";
    },
  },
});

export const {
  saveStudentAction,
  updateStudentInput,
  deleteStudentAction,
  updateStudentAction,
  updateSearchInput,
  claerFormAction,
} = formReduxReducer.actions;

export default formReduxReducer.reducer;
