/*
拖动组件
*/

import '../styles/block.css'

export default function DragBlock({ id, size, block }) {

  //拖动事件
  const drag = (e) => {
    e.dataTransfer.setData("good", e.target.id)
  }

  return (
    <div
      id={id}
      draggable="true"
      className={size === "normal" ? "drag-block" : "big-drag-block"}
      onDragStart={drag} 
    >name:{block.name}
    </div>
  )
}