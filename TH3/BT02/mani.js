$(document).ready(function () {
  console.log("jQuery is ready!");

  $('#registerForm').on('submit', function (e) {
    e.preventDefault(); // Ngăn submit truyền thống

    // Xóa thông báo cũ
    $('.error').text('');

    let name = $('#fullname').val().trim();
    let email = $('#email').val().trim();
    let password = $('#password').val().trim();
    let isValid = true;

    // Kiểm tra Họ tên
    if (name === "") {
      $('#error-name').text('Họ tên không được để trống');
      isValid = false;
    }

    // Kiểm tra Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $('#error-email').text('Email không hợp lệ');
      isValid = false;
    }

    // Kiểm tra Mật khẩu
    if (password.length < 6) {
      $('#error-password').text('Mật khẩu phải có ít nhất 6 ký tự');
      isValid = false;
    }

    if (isValid) {
      // Gửi AJAX
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts', // giả lập API
        method: 'POST',
        data: {
          name: name,
          email: email,
          password: password
        },
        success: function (response) {
          $('#registerForm').slideUp(); // Ẩn form
          $('#successDiv').fadeIn(); // Hiện thông báo thành công
          $('#details').html(
            `<p><strong>Họ tên:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>`
          );
        },
        error: function () {
          alert("❌ Server bận, vui lòng thử lại sau.");
        }
      });
    }
  });

  // Hiệu ứng xem chi tiết
  $('#detailBtn').click(function () {
    $('#details').slideToggle();
  });
});
