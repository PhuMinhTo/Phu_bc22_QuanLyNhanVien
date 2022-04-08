function DanhSachNhanVien() {
    this.arr = [];

    this.addNV = function(nv) {
        this.arr.push(nv);
    };

    this.searchIndexNV = function(account) {
        var index = -1;
        for(var i = 0; i < this.arr.length; i++) {
            var nhanVien = this.arr[i];
            if(nhanVien.account == account) {
                index = i;
                break;
            }
        }
        return index;
    }

    this.removeNV = function(account) {
        var index = this.searchIndexNV(account);

        if(index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.repairNV = function(account) {
        var index = this.searchIndexNV(account);

        if(index !== -1) {
            var nhanVien = this.arr[index];
            return nhanVien;
        }
        return null;
    };

    this.updateNV = function(nhanVien) {
        var index = this.searchIndexNV(nhanVien.account);

        if(index !== -1) {
            this.arr[index] = nhanVien;
        }
    };

    this.searchNV = function(keyword) {
        var searchArr = [];

        for(var i = 0; i < this.arr.length; i++) {
            var nhanVien = this.arr[i];
            if(nhanVien.classification.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                searchArr.push(nhanVien);
            }
        }
        return searchArr;
    };
}