function NguoiDungService()
{
    this.LayDanhSachNguoiDung = function()
    {
        var apiURL = "http://sv.myclass.vn/api/quanlytrungtam/danhsachnguoidung";
        return $.ajax({
            url:apiURL,
            type:'GET',
            dataType:'json'
        });
    }
}