function DanhSachNguoiDung() {
  this.MangNguoiDung = [];
  this.ThemNguoiDung = function (nd) {
    this.MangNguoiDung.push(nd)
  }
  this.XoaNguoiDung = function (taiKhoan) {
    for (var i = 0; i < this.MangNguoiDung.length; i++) {
      //Mỗi lần duyệt lấy ra 1 đối tượng người dùng từ MangNguoiDung
      var nguoiDung = this.MangNguoiDung[i];
      //so sánh giá trị thuộc tính TaiKhoan của đối tượng nguoiDung với tham số taiKhoan truyền vào
      if (nguoiDung.TaiKhoan == taiKhoan) {
        this.MangNguoiDung.splice(i, 1);
      }
    }

  }
  this.LayThongTinNguoiDung = function (taiKhoan) //Input: taiKhoan
  {
    //Tìm trong mangNguoiDung thuộc tính TaiKhoan = input => trả về nguoiDung đó
      for(var i=0; i < this.MangNguoiDung.length; i++) 
      {
          var nguoiDung = this.MangNguoiDung[i];
          if(taiKhoan == nguoiDung.TaiKhoan) 
          {
              return nguoiDung;
          }
      }
      return null;
  }
  
  this.CapNhatThongTinNguoiDung = function(nguoiDung) //thông tin NguoiDung sau khi thay đổi
  {
      for(var i=0;i<this.MangNguoiDung.length;i++)
      {
          var nguoiDungCapNhat = this.MangNguoiDung[i]; //Lấy người dùng trong Mang
          //Kiểm tra xem trùng với ttNguoiDung (tt: TaiKhoan) truyền vào không
          if(nguoiDungCapNhat.TaiKhoan == nguoiDung.TaiKhoan) 
          {
              nguoiDungCapNhat.HoTen = nguoiDung.HoTen; //Cập nhật thông tin người dùng trong mảng
              nguoiDungCapNhat.MatKhau = nguoiDung.MatKhau;
              nguoiDungCapNhat.Email = nguoiDung.Email;
              nguoiDungCapNhat.SoDT = nguoiDung.SoDT;
              nguoiDungCapNhat.MaLoaiNguoiDung = nguoiDung.MaLoaiNguoiDung;
              nguoiDungCapNhat.TenLoaiNguoiDung = nguoiDung.TenLoaiNguoiDung;
          }
      }
  }
  this.XoaDanhSachNguoiDung = function (mangTaiKhoan) {
    //Cách 1:
    // for(var i = 0 ; i < mangTaiKhoan.length ; i++)
    // {
    //     var taiKhoan = mangTaiKhoan[i];
    //     for(var j = 0 ; j<this.MangNguoiDung.length ; j++)
    //     {
    //         var nguoiDung = this.MangNguoiDung[j];
    //         if(taiKhoan == nguoiDung.TaiKhoan)
    //         {
    //           this.MangNguoiDung.splice(j,1);
    //         }
    //     }
    // }
    //Cách 2
    for (var i = 0; i < mangTaiKhoan.length; i++) {
      var taiKhoan = mangTaiKhoan[i];
      this.XoaNguoiDung(taiKhoan);
    }
  }
  this.TimKiemNguoiDung = function(tuKhoa)
  {   
      var cmService = new commonService();
      tuKhoa = cmService.getSEOtitle(tuKhoa.trim().toLowerCase()); 
      //trim(): loại bỏ khoảng trống đầu cuối của chuỗi
      //toLowerCase(): Chuyển chuỗi hoa thành thường
      var danhSachNguoiDungTK = new DanhSachNguoiDung();
      for(var i=0;i<this.MangNguoiDung.length;i++)
      {
          var nguoiDung = this.MangNguoiDung[i];
          var hoten = cmService.getSEOtitle(nguoiDung.HoTen.trim().toLowerCase());
      
          if(hoten.search(tuKhoa) != -1) //Tìm trong HoTen của từng người dùng có chứa từ khóa
          {
              danhSachNguoiDungTK.ThemNguoiDung(nguoiDung);
          }
      }
      return danhSachNguoiDungTK;
  }
}