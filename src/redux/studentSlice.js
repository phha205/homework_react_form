import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [
    { id: 1, maSV: "1", hoTen: "Nguyễn Văn A", sdt: "0938111111", email: "nguyenvana@gmail.com" },
    { id: 2, maSV: "2", hoTen: "Nguyễn Văn B", sdt: "0938222232", email: "nguyenvanb@gmail.com" },
  ],
  editingStudent: null,
  searchKeyword: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push({ id: Date.now(), ...action.payload });
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter((sv) => sv.id !== action.payload);
    },
    setEditingStudent: (state, action) => {
      state.editingStudent = action.payload; 
    },
    updateStudent: (state, action) => {
      const idx = state.students.findIndex((sv) => sv.id === action.payload.id);
      if (idx !== -1) state.students[idx] = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  setEditingStudent,
  updateStudent,
  setSearchKeyword,
} = studentSlice.actions;

export default studentSlice.reducer;
