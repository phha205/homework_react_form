import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, setEditingStudent, setSearchKeyword } from "../redux/studentSlice";

export default function StudentTable() {
  const dispatch = useDispatch();
  const { students, searchKeyword } = useSelector((s) => s.student);

  const filtered = students.filter(
    (sv) =>
      sv.hoTen.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      sv.maSV.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      sv.email.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="table-container">
      <input
        className="search-box"
        placeholder="Tìm kiếm (Mã SV / Họ tên / Email)…"
        value={searchKeyword}
        onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
      />

      <table>
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th style={{ width: 160 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((sv) => (
            <tr key={sv.id}>
              <td>{sv.maSV}</td>
              <td>{sv.hoTen}</td>
              <td>{sv.sdt}</td>
              <td>{sv.email}</td>
              <td>
                <button className="warning" onClick={() => dispatch(setEditingStudent(sv))}>Sửa</button>
                <button className="danger" onClick={() => dispatch(deleteStudent(sv.id))}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", opacity: 0.7 }}>
                Không có dữ liệu phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
