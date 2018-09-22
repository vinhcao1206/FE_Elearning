/* 
    Người Tạo : Đặng Trung Hiếu
    Ngày Tạo: 1/9/2018
    Nội dung: Module chức năng quản lý người dùng của giáo vụ 
    trong dự án quản lý trung tâm với jquery
*/

/* Hàm Hiển thị popup thêm người dùng */
var DSND = new DanhSachNguoiDung();
var arrDiem = [];
LayLocalStorage();
PhanTrang(DSND.MangNguoiDung);
function hienThiPopupThemND() {
    $("#btnModal").trigger('click');
    $('.modal-title').html('Thêm Người Dùng');
    var modalFooter = `
        <button class="btn btn-success" id="btnThem">Thêm người dùng</button>
        <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
    `
    $('.modal-footer').html(modalFooter);
    //Clear dữ liệu input
    $('.modal-body input').val('');
}
/* Hàm lấy dữ liệu từ form và lưu vào trong danh sách */
function themNguoiDung() {
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var soDT = $("#SoDienThoai").val();
    var maLoaiND = $("#LoaiND").val();
    var tenLoaiND = $("#LoaiND option:selected").text();
    //Tạo đối tượng người dùng mới.
    var nguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiND, tenLoaiND);
    DSND.ThemNguoiDung(nguoiDungMoi);
    console.log(DSND.MangNguoiDung);
    nguoiDungMoi.Diem = Math.floor((Math.random() * 1000) + 1);
    arrDiem.push(nguoiDungMoi.Diem);
    //Tạo bảng
    // taoBang(DSND.MangNguoiDung);
    PhanTrang(DSND.MangNguoiDung);
    //Ẩn popup
    $('.close').trigger('click');
    //Lưu dữ liệu vào local
    LuuLocalStorage();
    VeBieuDo(arrDiem);
}

//Hàm tạo bảng hiển thị danh sách người dùng
function taoBang(mangGiaTri) {
    var contentTable = '';
    for (var i = 0; i < mangGiaTri.length; i++) {
        var nguoiDung = mangGiaTri[i];
        contentTable += `
            <tr>
                <td><input class="ckbTaiKhoan" type="checkbox" value="${nguoiDung.TaiKhoan}" ></td>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td>${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td>
                <td>${nguoiDung.SoDT}</td>
                <td>
                    <button taikhoan="${nguoiDung.TaiKhoan}"  class="btnChinhSua btn btn-primary">Chỉnh sửa</button> 
                    <button class="btn btn-danger btnXoa" taikhoan="${nguoiDung.TaiKhoan}">Xóa</button> 
                </td>
                
            </tr>
        `
    }
    $('#tblDanhSachNguoiDung').html(contentTable)
}
//Hàm lưu mảng danh sách người dùng vào local storage
function LuuLocalStorage() {
    localStorage.setItem("DanhSachNguoiDung", JSON.stringify(DSND.MangNguoiDung));
}
function LayLocalStorage() {
    var mangLocal = JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
    if (mangLocal != null) {
        DSND.MangNguoiDung = mangLocal;
        taoBang(DSND.MangNguoiDung);
    }

}
//Cài đặt sự kiện nút xóa
$("body").delegate(".btnXoa", "click", function () {
    swal({
        title: "Xóa người dùng",
        text: "Bạn muốn xóa người dùng này ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            var btnXoa = $(this);
            //Lấy giá trị TaiKhoan từ nút xoa đang được click
            var taiKhoan = btnXoa.attr("taikhoan");
            //Gọi phương thức xóa người dùng của đối tượng DSND
            DSND.XoaNguoiDung(taiKhoan);
            //Load lại table
            // taoBang(DSND.MangNguoiDung);
            PhanTrang(DSND.MangNguoiDung);
            swal("Xóa thành công!", {
                icon: "success",
            });
            setTimeout(() => {
                $(".swal-button--confirm").trigger("click");
            }, 1000);

        }
    });
    XoaNguoiDung();
    // LuuLocalStorage();
});

$("body").delegate(".btnChinhSua", "click", function () {
    //Thao tác với popup 
    //Thay đổi header và footer
    $("#btnModal").trigger('click');
    $('.modal-title').html('Cập nhật thông tin');
    var modalFooter = `
        <button class="btn btn-success" id="btnCapNhat">Lưu</button>
        <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
    `;
    $('.modal-footer').html(modalFooter);
    //Load thông tin người dùng lên popup
    //Lấy tài khoản từ attribute của nút được click
    var taiKhoan = $(this).attr("taikhoan");
    var nguoiDung = DSND.LayThongTinNguoiDung(taiKhoan);
    if (nguoiDung != null) {
        //Dom đến các thẻ input load giá trị nguoiDung
        $("#TaiKhoan").val(nguoiDung.TaiKhoan);
        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#LoaiND").val(nguoiDung.MaLoaiNguoiDung);
    }
});

$("body").delegate("#btnCapNhat", "click", function () {
    //Lấy thông tin người dùng sau khi thay đổi
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var soDT = $("#SoDienThoai").val();
    var maLoaiND = $("#LoaiND").val();
    var tenLoaiND = $("#LoaiND option:selected").text();
    //Tạo đối tượng người dùng mới.
    var nguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maLoaiND, tenLoaiND);
    DSND.CapNhatThongTinNguoiDung(nguoiDungMoi);
    //Load table
    taoBang(DSND.MangNguoiDung);
    swal("Cập nhật!", "Thành công!", "success");
    //Ẩn popup
    // $('.close').trigger('click');
    document.getElementsByClassName("close")[0].click();
    //Lưu dữ liệu vào local
    LuuLocalStorage();
});



$("#btnXoaNguoiDung").click(function () {  //callback function
    var mangTaiKhoan = [];
    //Cách 1: Lấy danh sách các TaiKhoan từ các checkbox ĐƯỢC CHỌN
    //    var lstCkbTaiKhoan = document.getElementsByClassName("ckbTaiKhoan");
    //    for(var i=0;i<lstCkbTaiKhoan.length;i++)
    //    {
    //         var ckbTaiKhoan = lstCkbTaiKhoan[i];
    //         if(ckbTaiKhoan.checked) //Nếu như checkbox đó được check
    //         {
    //              mangTaiKhoan.push(ckbTaiKhoan.value);

    //         }
    //    }
    //Cách 2: dùng phương thức each để duyệt các thẻ cùng selector (ở đây là .ckbTaiKhoan)
    $(".ckbTaiKhoan").each(function () {
        var ckbTaiKhoan = $(this);
        var taiKhoan = ckbTaiKhoan.val();
        if (ckbTaiKhoan.is(":checked")) //Kiểm tra thẻ có thuộc tính checked không
        {
            mangTaiKhoan.push(taiKhoan);
        }
    });
    //Gọi phương thức xóa người dùng
    DSND.XoaDanhSachNguoiDung(mangTaiKhoan);
    //Load lại table
    taoBang(DSND.MangNguoiDung);

});

// $("#txtTuKhoa").keyup(TimKiemNguoiDung);
$("#btnTimKiemNguoiDung").click(TimKiemNguoiDung);
function TimKiemNguoiDung() {
    var tuKhoa = $("#txtTuKhoa").val();
    var doDaiTuKhoa = tuKhoa.length;

    var danhSachNguoiDungTK = DSND.TimKiemNguoiDung(tuKhoa);
    PhanTrang(danhSachNguoiDungTK.MangNguoiDung); //Load lại table
    //Duyệt các thẻ td
    $(".tdHoTen").each(function () {
        var hoTen = $(this).text(); //Lấy ra họ tên
        var viTriTuKhoa = hoTen.search(tuKhoa); //vị trí từ khóa trong chuỗi hoTen
        if (viTriTuKhoa != -1) {
            var chuoiKetQua = `
                ${hoTen.substring(0, viTriTuKhoa)} 
                <span class="InDam">${tuKhoa}</span> 
                ${hoTen.substring(viTriTuKhoa + doDaiTuKhoa)}
            `;
            $(this).html(chuoiKetQua); //Gán lại cho html() của chính thẻ td đó
        }
    });
    $(".InDam").NhapNhay({soLan:3,size:"17px",color:"red"});
}

//--------------GỌI HÀM-------------------
$("#btnThemNguoiDung").click(hienThiPopupThemND);
$('body').delegate('#btnThem', 'click', themNguoiDung);

//Phần phân trang
function PhanTrang(MangNguoiDung) {
    $('#pagination-container').pagination({
        dataSource: MangNguoiDung,
        pageSize: 3,
        showGoInput: true,
        showGoButton: true,
        callback: function (data, pagination) {
            // template method of yourself
            var html = simpleTemplating(data);

            $('#tblDanhSachNguoiDung').html(html);
        }
    });

    function simpleTemplating(data) {
        html = "";
        for (var i = 0; i < data.length; i++) {
            var nguoiDung = data[i];

            html += `
            <tr>
                <td><input class="ckbTaiKhoan" type="checkbox" value="${nguoiDung.TaiKhoan}" ></td>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td class="tdHoTen">${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td>
                <td>${nguoiDung.SoDT}</td>  
                <td>
                    <button taikhoan="${nguoiDung.TaiKhoan}"  class="btnChinhSua btn btn-primary">Chỉnh sửa</button> 
                    <button class="btn btn-danger btnXoa" taikhoan="${nguoiDung.TaiKhoan}">Xóa</button> 
                </td>  
            </tr>
        `
        }
        return html;
    }
}

VeBieuDo([]);
//vẽ biểu đồ
function VeBieuDo(arrayDiem) {
    Highcharts.chart('container', {
        title: {
            text: 'Biểu đồ người dùng'
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Installation',
            data: arrayDiem
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}