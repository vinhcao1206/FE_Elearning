function KhoaHocService(){
    this.LayDanhSachKhoaHoc = function(){
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc`;
        return $.ajax({
            url:apiURL,
            type:"GET",
            dataType:"json",
            // async:false
        });
    }
    this.ThemKhoaHoc = function (khoaHoc)
    {
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc`;
        return $.ajax({
            url:apiURL,
            type:"POST",
            dataType:"json",
            data:khoaHoc
        }); 
    } 
    this.CapNhatKhoaHoc = function (khoaHoc)
    {
        var apiURL = `http://sv.myclass.vn/api/QuanLyTrungTam/capnhatkhoahoc`;
        return $.ajax({
            url:apiURL,
            type:"PUT",
            dataType:"json",
            data:khoaHoc
        }); 
    }
    this.XoaKhoaHoc = function (maKhoaHoc){
        var apiURL = `http://sv.myclass.vn/api/quanlytrungtam/xoakhoahoc/${maKhoaHoc}`;
        return $.ajax({
            url:apiURL,
            type:"DELETE",
        })
    }
}