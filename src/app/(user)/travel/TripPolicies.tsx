import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";

const TripPolicies = () => {
  return (
    <>
      <Typography
        children={`Chính sách của chúng tôi`}
        color="#1976d2"
        fontWeight={700}
        fontSize={20}
        textAlign="center"
      />
      <Typography
        children={`Yêu cầu khi lên xe`}
        color="#1976d2"
        fontWeight={300}
        fontSize={20}
      />
      <List>
        <ListItem>
          <ListItemText primary="- Có mặt tại văn phòng/quầy vé/bến xe trước 30 phút để làm thủ tục lên xe" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Xuất trình SMS/Email đặt vé trước khi lên xe" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Không mang đồ ăn, thức ăn có mùi lên xe" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Không hút thuốc, uống rượu, sử dụng chất kích thích trên xe" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Không mang các vật dễ cháy nổ lên xe" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Không vứt rác trên xe" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Không làm ồn, gây mất trật tự trên xe" />
        </ListItem>
        <Grid
          item
          container
          direction="column"
          borderBottom="1px solid hsl(0, 0%, 60%)"
          height="100%"
          paddingX={20}
        />
      </List>
      <Typography
        children={`Hành lý xách tay`}
        color="#1976d2"
        fontWeight={300}
        fontSize={20}
      />
      <List>
        <ListItem>
          <ListItemText primary="- Tổng trọng lượng hành lý không vượt quá 3 kg" />
        </ListItem>
        <Grid
          item
          container
          direction="column"
          borderBottom="1px solid hsl(0, 0%, 60%)"
          height="100%"
          paddingX={20}
        />
      </List>
      <Typography
        children={`Trẻ em và phụ nữ có thai`}
        color="#1976d2"
        fontWeight={300}
        fontSize={20}
      />
      <List>
        <ListItem>
          <ListItemText primary="- Trẻ em dưới 3 tuổi hoặc dưới 100 cm được miễn phí vé nếu ngồi cùng ghế/giường với bố mẹ" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Trẻ em từ 3 tuổi hoặc cao từ 100 cm trở lên mua vé như người lớn" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Phụ nữ có thai cần đảm bảo sức khỏe trong suốt quá trình di chuyển" />
        </ListItem>
        <Grid
          item
          container
          direction="column"
          borderBottom="1px solid hsl(0, 0%, 60%)"
          height="100%"
          paddingX={20}
        />
      </List>
      <Typography
        children={`Xuất hóa đơn GTGT`}
        color="#1976d2"
        fontWeight={300}
        fontSize={20}
      />
      <List>
        <ListItem>
          <ListItemText primary="- Nhà xe có cung cấp hóa đơn GTGT cho dịch vụ xe khách, phí xuất hóa đơn là 10 % trên giá dịch vụ quý khách đã mua" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- Nhà xe từ chối xuất lại hóa đơn nếu hành khách cung cấp sai thông tin" />
        </ListItem>
      </List>
    </>
  );
};

export default TripPolicies;
