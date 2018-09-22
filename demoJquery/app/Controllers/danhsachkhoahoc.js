$(document).ready(function () {

    var dsKhoaHoc = new DanhSachKhoaHoc();
    var svKhoaHoc = new KhoaHocService();
    var svNguoiDung = new NguoiDungService();

    //Gọi phương thức từ service thông qua api đã cài đặt lấy dữ liệu

    svKhoaHoc.LayDanhSachKhoaHoc()
        .done(function (data) {
            dsKhoaHoc.MangKhoaHoc = data;
            LoadDanhSachKhoaHoc(dsKhoaHoc.MangKhoaHoc);
            console.log(dsKhoaHoc.MangKhoaHoc);
        })
        .fail(function (error) {

        });
    //Load nội dung cho thẻ select người tạo
    svNguoiDung.LayDanhSachNguoiDung().done(function (MangNguoiDung) {
        //Gọi hàm load nội dung cho thẻ select
        // console.log(MangNguoiDung);
        LoadSelectNguoiDung(MangNguoiDung);
    }).fail(function (error) {
        console.log(error);
    });

    function LoadSelectNguoiDung(MangNguoiDung) {
        var noiDungSelect = "";
        MangNguoiDung.map(function (nguoiDung, index) {
            if (nguoiDung.MaLoaiNguoiDung == "GV") {
                noiDungSelect += `
                    <option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
            `;
            }
        });
        $("#NguoiTao").html(noiDungSelect);
    }

    function LoadDanhSachKhoaHoc(MangKhoaHoc) {
        var noiDungTable = ``;
        //index: vị trí phần tử trong mảng
        //khoahoc: đối tượng trong mảng
        MangKhoaHoc.map(function (khoahoc, index) {
            var moTa = khoahoc.MoTa;
            if (khoahoc.MoTa != null) {
                // BieuThucDieuKien ? Đúng thực hiện BieuThuc1 : Sai thực hiện biểu thức 2
                khoahoc.MoTa.length >= 100 ? moTa = khoahoc.MoTa.substring(0, 100) : moTa = khoahoc.MoTa;
            }
            noiDungTable += `
                <tr>
                    <td><input class="ckbMaKhoaHoc" type="checkbox" value="${khoahoc.MaKhoaHoc}"></td>
                    <td>${khoahoc.MaKhoaHoc}</td>
                    <td>${khoahoc.TenKhoaHoc}</td>
                    <td>${khoahoc.MoTa}</td>
                    <td><img src='${khoahoc.HinhAnh}' width="75" height="50" /></td>
                    <td>${Number(khoahoc.LuotXem).toLocaleString()}</td>
                    <td>${khoahoc.NguoiTao}</td>
                    <td><a href="chinhsuakhoahoc.html?makhoahoc=${khoahoc.MaKhoaHoc}">Chỉnh sửa</a></td>
                    <td>
                        <button class="btn btn-primary btnChinhSua" makhoahoc="${khoahoc.MaKhoaHoc}" >Chỉnh sửa</button>
                        <button class="btn btn-danger btnXoa" makhoahoc="${khoahoc.MaKhoaHoc}">Xóa</button>
                    </td>
                </tr>
            `
        });
        $("#tblDanhSachKhoaHoc").html(noiDungTable);
    }

    //Thêm khóa học
    $("#btnThemKhoaHoc").click(function () {
        $("#btnModal").trigger('click');
        $('.modal-title').html('Thêm khóa học');
        var modalFooter = `
            <button class="btn btn-success" id="btnThemKH">Thêm khóa học</button>
            <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
        `
        $('.modal-footer').html(modalFooter);
        //Clear dữ liệu input
        $('.modal-body input').val('');
        CKEDITOR.instances.MoTa.setData("");  
    });

    $("body").delegate("#btnThemKH", "click", function () {
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        khoaHoc.MoTa = $("#MoTa").val();
        khoaHoc.MoTa = CKEDITOR.instances.MoTa.getData();  
        khoaHoc.LuotXem = $("#LuotXem").val();
        khoaHoc.NguoiTao = $("#NguoiTao").val();
        //Gọi service post dữ liệu khóa học lên server
        svKhoaHoc.ThemKhoaHoc(khoaHoc).done(function (ketqua) {
            if (ketqua) {
                location.reload(); //Thêm thành công refresh lại trang
            }
        }).fail(function (loi) {
            console.log(loi);
        })
    });
    //Chỉnh sưa khóa học
    $("body").delegate(".btnChinhSua", "click", function () {
        $("#btnModal").trigger('click');
        $('.modal-title').html('Thêm khóa học');
        var modalFooter = `
            <button class="btn btn-success" id="btnLuu">Lưu</button>
            <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
        `;
        $('.modal-footer').html(modalFooter);
        //Lấy mã khóa học từ chính nút chỉnh sửa
        var MaKhoaHoc = $(this).attr("makhoahoc");
        var khoaHoc = dsKhoaHoc.LayThongTinKhoaHoc(MaKhoaHoc);
        if (khoaHoc != null) {
            //Load giá trị lên thẻ input
            $("#MaKhoaHoc").val(khoaHoc.MaKhoaHoc);
            $("#TenKhoaHoc").val(khoaHoc.TenKhoaHoc);
            CKEDITOR.instances.MoTa.setData(khoaHoc.MoTa);
            // $("#MoTa").val();
            $("#LuotXem").val(khoaHoc.LuotXem);
            $("#NguoiTao").val(khoaHoc.NguoiTao);
        }
    });
    $("body").delegate("#btnLuu","click",function(){
        var khoaHoc = new KhoaHoc();
        khoaHoc.MaKhoaHoc = $("#MaKhoaHoc").val();
        khoaHoc.TenKhoaHoc = $("#TenKhoaHoc").val();
        // khoaHoc.MoTa = $("#MoTa").val();
        khoaHoc.MoTa = CKEDITOR.instances.MoTa.getData();
        khoaHoc.LuotXem = $("#LuotXem").val();
        khoaHoc.NguoiTao = $("#NguoiTao").val();
        //Gọi service post dữ liệu khóa học lên server
        svKhoaHoc.CapNhatKhoaHoc(khoaHoc).done(function (ketqua) {
            if (ketqua) {
                location.reload(); //Cập nhật thành công refresh lại trang
            }
        }).fail(function (loi) {
            console.log(loi);
        })
    });

    CKEDITOR.replace( 'MoTa' );
    //Xóa khóa học
    $("body").delegate(".btnXoa","click",function(){
        var MaKhoaHoc = $(this).attr("makhoahoc");
        console.log(MaKhoaHoc);
        svKhoaHoc.XoaKhoaHoc(MaKhoaHoc).done(function(ketqua){
            console.log(ketqua);
            location.reload();
        }).fail(function(loi){
            console.log(loi);
        })
    });

    //Xóa nhiều khóa học
    $("#checkAll").click(function(){
        //Nếu như checkall được click => các checkbox khác click
        //B1: Khi checkbox CheckAll click lấy giá trị checkbox #checkAll ra
        var checked = $(this).prop("checked"); 
        //B2: Lấy tất cả các .ckbMaKhoaHoc gán thuộc tính checked = với thuộc tính checked của checkall
        var lstChecked = $(".ckbMaKhoaHoc");
        console.log(lstChecked);
        for(var i=0;i< lstChecked.length;i++)
        {
            var ckb = lstChecked[i];
            ckb.checked = checked;
        }
    });
    //Xử lý xóa các checkbox của khóa học khi xóa
    $("#btnXoaKhoaHoc").click(function(){
        //Lấy danh sách các checkbox
        var lstChecked = $(".ckbMaKhoaHoc");
        for(var i=0;i< lstChecked.length;i++)
        {
            var ckb = lstChecked[i];
            //Nếu như checkbox nào được check thì gọi service xóa
            if(ckb.checked)
            {
                svKhoaHoc.XoaKhoaHoc(ckb.value).done(function(ketqua){
                    console.log(ketqua);
                    location.reload();
                }).fail(function(loi){
                    console.log(loi);
                })
            }
        }
    })
});