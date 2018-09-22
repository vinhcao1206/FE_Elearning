function DanhSachKhoaHoc(){
    this.MangKhoaHoc = [];
    this.LayThongTinKhoaHoc = function (maKhoaHoc)
    {
        var KhoaHoc = {};
        this.MangKhoaHoc.map(function(khoaHoc, index)
        {
            if(khoaHoc.MaKhoaHoc == maKhoaHoc)
            {
                KhoaHoc = khoaHoc;
            }
        });
        return KhoaHoc;
    }
}