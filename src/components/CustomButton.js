export default function CustomButton(props) {
  const { title, icon, name, handleClick } = props;
  return (
    <button type="button" title={title} onClick={handleClick}>
      {icon ? <i className={icon}></i> : name}
    </button>
  );
}
