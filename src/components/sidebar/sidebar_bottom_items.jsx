export default function SidebarBottomItems(props) {
  return (
    <div
      className={props.className}
      onClick={!props.menuCollapse ? props.onClick : undefined}
    >
      {props.icon}
      {props.menuCollapse && <p>{props.text}</p>}
    </div>
  );
}
