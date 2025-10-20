import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent, setEditingStudent } from "../redux/studentSlice";

const empty = { maSV: "", hoTen: "", sdt: "", email: "" };

export default function StudentForm() {
  const dispatch = useDispatch();
  const editing = useSelector((s) => s.student.editingStudent);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  // lifecycle: khi chọn sửa -> đổ form
  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const validate = () => {
    const e = {};
    if (!form.maSV.trim()) e.maSV = "Mã SV không được để trống";
    if (!form.hoTen.trim()) e.hoTen = "Họ tên không được để trống";
    if (!/^\d{9,11}$/.test(form.sdt.trim())) e.sdt = "SĐT 9-11 số";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Email không hợp lệ";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editing) {
      dispatch(updateStudent(form));
      dispatch(setEditingStudent(null));
    } else {
      dispatch(addStudent(form));
    }
    setForm(empty);
  };

  const onCancelEdit = () => {
    dispatch(setEditingStudent(null));
    setForm(empty);
    setErrors({});
  };

  return (
    <div className="form-container">
      <h3>Thông tin sinh viên</h3>
      <form onSubmit={onSubmit}>
        <div className="grid">
          <div>
            <input name="maSV" value={form.maSV} onChange={onChange} placeholder="Mã SV" />
            {errors.maSV && <small className="error">{errors.maSV}</small>}
          </div>
          <div>
            <input name="hoTen" value={form.hoTen} onChange={onChange} placeholder="Họ tên" />
            {errors.hoTen && <small className="error">{errors.hoTen}</small>}
          </div>
          <div>
            <input name="sdt" value={form.sdt} onChange={onChange} placeholder="Số điện thoại" />
            {errors.sdt && <small className="error">{errors.sdt}</small>}
          </div>
          <div>
            <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>
        </div>

        <div className="actions">
          <button type="submit">{editing ? "Cập nhật sinh viên" : "Thêm sinh viên"}</button>
          {editing && (
            <button type="button" className="secondary" onClick={onCancelEdit}>
              Huỷ sửa
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
