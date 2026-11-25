# HILL AND STILL — MVP 01 · Real Audio Library Upgrade

## Chạy thử
1. Giải nén ZIP.
2. Mở `index.html` bằng Chrome hoặc Edge.
3. Vào **Music library** → nhấn **Chọn thư mục nhạc trên máy** → chọn thư mục gốc `D:\` (hoặc thư mục chứa 6 folder nhạc).
4. Trình duyệt sẽ đối chiếu tên file MP3 với 51 track trong thư viện. File khớp sẽ hiện nút Play.
5. Chọn bài để phát; player cố định ở cạnh dưới hỗ trợ Play/Pause, bài trước/sau, tua, âm lượng và visualizer theo tín hiệu âm thanh thật.
6. Mood check-in → tạo playlist cá nhân hóa → Refresh để luân phiên 5 gợi ý.
7. Add lưu bài vào My Library; Add Your Own Music và upload file riêng vẫn hoạt động cục bộ.

## Nội dung nâng cấp
- Thay 14 mục demo bằng 51 track ACTIVE từ Master Library đã chốt.
- Phân loại đúng 6 nhóm: Ballad, Rap-Hip Hop, Rock Alternative, Electronic EDM, Instrumental Classical, Natural Sounds ASMR.
- Music library có tìm kiếm, lọc thể loại và trạng thái liên kết MP3.
- Chọn thư mục nhạc bằng Chrome/Edge File System picker (`webkitdirectory`); khớp theo tên file gốc đã ghi trong workbook.
- Player tập trung dùng HTMLAudioElement; visualizer lấy dữ liệu từ Web Audio API, không chạy giả lập khi không có âm thanh.
- Recommender xếp hạng toàn bộ 51 track và hiển thị luân phiên 5 bài mỗi lượt.
- Giữ My Library, Add Your Own Music, upload audio và feedback cục bộ.

## Dữ liệu chưa suy đoán
- BPM, Mood, Vocal và Energy thực tế chưa được phân tích bằng âm thanh. Energy đặt mức trung tính 3/5 làm giá trị khởi tạo cho recommender, không phải kết quả đo.
- Thư viện không nhúng file MP3 vào ZIP vì MP3 đang nằm trên máy người dùng. Cần chọn thư mục gốc `D:\` lần đầu mở trang; trình duyệt không cho website tự đọc ổ đĩa nếu chưa có thao tác chọn file của người dùng.
- Đường dẫn file chỉ có hiệu lực trong phiên trình duyệt; tải lại trang thì chọn thư mục lại. Không upload file lên server.
- Chưa có backend, tài khoản hay đồng bộ đa thiết bị.

## Quyền riêng tư
File được truy cập cục bộ qua lựa chọn của người dùng; không gửi lên máy chủ. My Library và feedback lưu trong localStorage.


## Tìm kiếm bài hát ngoài thư viện (bên thứ ba)

- Ô tìm kiếm Music Library vẫn lọc 51 track nội bộ, đồng thời tìm thêm bài hát bên ngoài khi người dùng nhập ít nhất 2 ký tự.
- Nguồn metadata: Apple iTunes Search API (`https://itunes.apple.com/search`), không cần API key và không cần backend.
- Kết quả bên ngoài được gắn nhãn riêng, không tự động nhập vào catalog chính thức.
- Nếu Apple cung cấp `previewUrl`, người dùng có thể nghe thử đoạn preview; nút “Mở nguồn” dẫn tới trang bài hát của Apple.
- “Lưu” chỉ thêm metadata và preview/source link vào My Library trên trình duyệt. Đây không phải bản tải nhạc hoặc quyền phân phối audio.
- Tìm kiếm cần kết nối Internet. Nếu API lỗi/CORS/mạng bị chặn, thư viện nội bộ vẫn hoạt động bình thường.
- API chỉ cung cấp các kết quả có trong danh mục Apple; không bảo đảm tìm thấy mọi bài hát hoặc luôn có preview tại Việt Nam.
