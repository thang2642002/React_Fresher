const Home = () => {
  return (
    <div className="home-container">
      <div className="mt-3">
        <b> Yêu cầu:</b>
        <br />
        Sử dụng API từ trang web https://reqres.in dể tọa website.
      </div>
      <div>
        Sử dụng React tạo một màn hình website cơ nảm bao gồn các chức năng:
      </div>
      <ul>
        <li>1. Đăng nhập</li>
        <li>2. Thêm User</li>
        <li>3. Sửa User</li>
        <li>4. Xóa User</li>
        <li>5. Hiển thị danh sách User</li>
        <li>6. Tìm kiếm User theo Email</li>
        <li>7. Sắp xếp theo first name</li>
        <li>8. Ipmport User từ file Excel</li>
        <li>9. Export User ra file Excel</li>
      </ul>
      <div>
        Tự do tùy chỉnh Html, Css để có một website nhẹ nhàng ,khoa học và đẹp.
      </div>
      <div className="my-3">
        Commit và đẩy souce code lên github public.
        <br />
        Triển khai tràn website lên Herocu để demo.
      </div>
      <div>
        <b> Result:</b>
        <br />
        thời gian hoàn thành: 1-3 ngày.
        <br />
        Gửi link Heroku và Github link lại gmail này.
        <br />
        Thời gian phản hồi 2 ngày làm việc kể từ thời gian nhận bài thi.
      </div>
      <div className="mt-4">
        <b>Yêu cầu</b>
        <br />
        Back-End(optional - không bắt buộc): Sử dụng Python django rest
        frameword, tạo các API như trên tràn website: https://reqres.in
      </div>
    </div>
  );
};

export default Home;
