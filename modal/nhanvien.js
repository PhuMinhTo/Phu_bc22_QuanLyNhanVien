function NhanVien(
  _account,
  _usename,
  _email,
  _password,
  _workDay,
  _salary,
  _position,
  _workTime,
  _totalSalary,
  _classification
) {
  this.account = _account;
  this.usename = _usename;
  this.email = _email;
  this.password = _password;
  this.workDay = _workDay;
  this.salary = _salary;
  this.position = _position;
  this.workTime = _workTime;
  this.totalSalary = 0;
  this.classification = "";

  this.calc_totalSalary = function (position) {
    if (position === "Sếp") {
      this.totalSalary = this.salary * 3;
    } else if (position === "Trưởng phòng") {
      this.totalSalary = this.salary * 2;
    } else {
      this.totalSalary = this.salary;
    }
  };

  this.calc_classification = function (workTime) {
    if (workTime >= 192) {
      this.classification = "xuất sắc";
    } else if (workTime >= 176) {
      this.classification = "giỏi";
    } else if (workTime >= 160) {
      this.classification = "khá";
    } else {
      this.classification = "TB";
    }
  };
}
