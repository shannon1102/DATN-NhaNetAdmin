export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Điện thoại",
    width: 100,
  },
  {
    field: "sex",
    headerName: "Giới tính",
    width: 100,
  },
  {
    field: "age",
    headerName: "Tuổi",
    width: 100,
  }
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 200,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 200,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 100,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 200,
  },
  {
    field: "numFloors",
    headerName: "Tầng",
    width: 100,
  },
  {
    field: "numBedRooms",
    headerName: "Phòng ngủ",
    width: 100,
  },
  {
    field: "squaredMeterArea",
    headerName: "Diện tích",
    width: 100,
  },
  {
    field: "lengthMeter",
    headerName: "Dài",
    width: 100,
  },
  {
    field: "widthMeter",
    headerName: "Rộng",
    width: 100,
  },

  {
    field: "houseType",
    headerName: "Loại nhà",
    width: 100,
  },
  {
    field: "district",
    headerName: "Địa chỉ",
    width: 100,
  },
];

// "lengthMeter": 0,
// "widthMeter": 0,
// "certificateOfland": 0,
// "featureImageId":3,
// "district": "strin
export const postColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "description",
    headerName: "Mô tả",
    width: 500,
  },
  {
    field: "createdAt",
    headerName: "Ngày đăng",
    width: 100,
  },
  {
    field: "like",
    headerName: "Số like",
    width: 100,
  },
  {
    field: "userId",
    headerName: "ID Chủ bài viết",
    width: 400,
  },
];

export const depositColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customerName",
    headerName: "Tên người đặt cọc",
    width: 230,
  },
  {
    field: "customerEmail",
    headerName: "Email người đặt cọc",
    width: 500,
  },
  {
    field: "customerPhone",
    headerName: "Số điện thoại",
    width: 230,
  },
  {
    field: "customerAddress",
    headerName: "Đại chỉ",
    width: 230,
  },
  {
    field: "paymentMethod",
    headerName: "Phương thức thanh toán",
    width: 230,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 100,
  },
  {
    field: "price",
    headerName: "Số tiền đặt cọc",
    width: 100,
  },
  {
    field: "productId",
    headerName: "ID sản phẩm",
    width: 100,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 400,
  },
];