/**
 * Tạo đối tượng dsnv từ lớp đối tượng DanhSachNhanVien
 * */
var dsnv = new DanhSachNhanVien();

/**
 * Tạo đối tượng validation từ lớp đối tượng Validation
 * */
var validation = new Validation();

/**
 * Hàm tham chiếu đến thuộc tính id
 * */
function getEle(id) {
  return document.getElementById(id);
}

/**
 * Hàm dùng để lưu thông tin người dùng xuống LocalStorage
 * */
function setLocalStorage() {
  //Chuyển data từ JSON => String
  var dataString = JSON.stringify(dsnv.arr);

  //Luu xuong LocalStorage
  localStorage.setItem("DSNV", dataString);
}

/**
 * Hàm dùng để xuất thông tin người dùng từ LocalStorage
 */
function getLocalStorage() {
  var data = localStorage.getItem("DSNV");
  if (data) {
    //chuyển từ String => JSON
    var dataJson = JSON.parse(data);

    dsnv.arr = dataJson;
    taoBang(dsnv.arr);
  }
}
getLocalStorage();

/**
 * Hàm lấy thông tin từ người dùng
 */
function layThongTinNhanVien() {
  // DOM tới các thẻ input lấy value
  var account = getEle("tknv").value;
  var usename = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var workDay = getEle("datepicker").value;
  var salary = getEle("luongCB").value;
  var position = getEle("chucvu").value;
  var workTime = getEle("gioLam").value;

  // Flag (cờ)
  var isValid = true;

  // Validation
  isValid &= validation.kiemTraRong(account, "tbTKNV", "Vui lòng nhập tài khoản") && validation.kiemTraDoDaiKyTu(account, "tbTKNV", "Nhập tối đa 4 - 6 kí số", 4, 6);
  isValid &= validation.kiemTraRong(usename, "tbTen", "Vui lòng nhập Họ và Tên") && validation.kiemTraChuoiKyTu(usename, "tbTen", "Vui lòng nhâp kí tự");
  isValid &= validation.kiemTraRong(email, "tbEmail", "Vui lòng nhập email") && validation.kiemTraEmail(email, "tbEmail", "Email không hợp lệ");
  isValid &= validation.kiemTraRong(password, "tbMatKhau", "Vui lòng nhập mật khẩu") && validation.kiemTraDoDaiKyTu(password, "tbMatKhau", "Nhập tối đa 6 - 10 kí số", 6, 10) && validation.kiemTraMatKhau(password, "tbMatKhau", "Phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");
  isValid &= validation.kiemTraRong(salary, "tbLuongCB", "Vui lòng nhập lương");
  isValid &= validation.kiemTraChucVu(chucvu, "tbChucVu", "Vui lòng chọn chức vụ")
  isValid &= validation.kiemTraRong(workTime, "tbGiolam", "Vui lòng nhập giờ làm");


  // Check form
  if(!isValid) return null;

  // Tạo đối tượng nhanVien tử lớp đối tượng NhanVien
  var nhanVien = new NhanVien(
    account,
    usename,
    email,
    password,
    workDay,
    salary,
    position,
    workTime
  );
  nhanVien.calc_totalSalary(nhanVien.position);
  nhanVien.calc_classification(nhanVien.workTime);
  return nhanVien;
}

/**
 * Hàm tạo bảng thông tin nhanVien
 */
function taoBang(arr) {
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var nhanVien = arr[i];
    content += `
          <tr>
                <td>${nhanVien.account}</td>
                <td>${nhanVien.usename}</td>
                <td>${nhanVien.email}</td>
                <td>${nhanVien.workDay}</td>
                <td>${nhanVien.position}</td>
                <td>${nhanVien.totalSalary}</td>
                <td>${nhanVien.classification}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${nhanVien.account}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaNV('${nhanVien.account}')">Xoá</button>
                </td>
          </tr>
      `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

/**
 * Thêm NV
 */
getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNhanVien();

  if(nhanVien) {
    // Thêm nhanVien
    dsnv.addNV(nhanVien);

    // Tạo bảng
    taoBang(dsnv.arr);

    // Thêm nhanVien vào LocalStorage
    setLocalStorage();
  }
});

/**
 * Xóa NV
 */
function xoaNV(account) {
  // Xóa nhanVien
  dsnv.removeNV(account);

  // Tạo bảng
  taoBang(dsnv.arr);

  // Setting lại LocalStorage
  setLocalStorage();
}

/**
 * Sửa NV
 */
function suaNV(account) {
  // Lấy thông tin chi tiết của nhanVien
  var nhanVien = dsnv.repairNV(account);

  if (nhanVien) {
    // Show tất cả thông tin nhanVien ra tab input
    getEle("tknv").disabled = true;
    getEle("name").value = nhanVien.usename;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.password;
    getEle("datepicker").value = nhanVien.workDay;
    getEle("luongCB").value = nhanVien.salary;
    getEle("chucvu").value = nhanVien.position;
    getEle("gioLam").value = nhanVien.workTime;
  }
}

/**
 * Cập nhật NV
 */
getEle("btnCapNhat").addEventListener("click", function () {
  // Lấy lại thông tin nhanVien từ input
  var nhanVien = layThongTinNhanVien();

  // Câp nhật nhanVien
  dsnv.updateNV(nhanVien);

  // Tạo bảng
  taoBang(dsnv.arr);

  // Setting lại LocalStorage
  setLocalStorage();
});

/**
 * Tìm kiếm NV
 */
getEle("searchName").addEventListener("keyup", function () {
  // Lấy từ khóa cần tìm
  var keyword = getEle("searchName").value;

  // Tìm kiếm từ khóa trong mảng mới
  var searchArr = dsnv.searchNV(keyword);

  // Tạo bảng
  taoBang(searchArr);
});
