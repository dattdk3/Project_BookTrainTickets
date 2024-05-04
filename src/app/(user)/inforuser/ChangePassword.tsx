import "./css.css";

interface ChangePasswordProps{
    activeContent: string;
}

const ChangePassword = (props: ChangePasswordProps) => {
  return (
    <div
      className={`content ${props.activeContent === "quanLiThe" ? "active" : ""}`}
      id="quanLiThe"
    >
    </div>
  );
};

export default ChangePassword;
