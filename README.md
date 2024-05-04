NOTE:
- Chạy project Backend: thay đổi credential database và ddl sẽ được seed tự động
- Chạy 2 file sql trong folder src/data/seed
- Hai tài khoản mock được tạo: user@test.com và brand@test.com với mật khẩu mặc định: 1qaz!QAZ
- Thay clienturl trong application.properties bằng base url của client
- Để chạy được paypal local, cần phải setup domain ảo ở local và thay vào trong baseurl ở trên
- có thể sử dụng sandbox paypal sau để thanh toán thử:
  sb-687hj25342027@personal.example.com
  @-1s*#YZ

- cần thêm file .env.local ở project FE với properties sau: NEXT_PUBLIC_BASE_URL = http://localhost:8080/api
