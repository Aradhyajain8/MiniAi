export default function SidebarBottomItems(props) {
  return (
    <div className={props.className} onClick={props.onClick}>
      {props.icon}
      {props.menuCollapse && <p>{props.text}</p>}
    </div>
  );
}
