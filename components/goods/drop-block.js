import { useRouter } from 'next/router'
import '../styles/block.css'

function DropBlock({ id, size, onSelect }) {

  const router = useRouter()
  //拖动鼠标到另一个可接受区域
  const dragEnter = (e) => {
    e.target.style.height = '120px'
    e.target.style.background = 'rgb(233, 87, 88)'
    e.target.style.border = 'none'
    e.target.style.borderRadius = '25px'
  }

  //当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
  const drop = (e) => {
    e.preventDefault()
    const selectId = e.dataTransfer.getData("good");
    onSelect(selectId)
    router.push(`/application/goods?id=${selectId}`)
  }

  //a拖到b，离开b的时候触发
  const dragLeave = (e) => {
    e.target.style.height = '40px'
    e.target.style.background = '#eaeaea'
    e.target.style.border = '1px dashed #666'
    e.target.style.borderRadius = '10px'
  }

  const allowDrop = (e) => {
	  e.preventDefault();
  }
 
  return (
    <div
      id={id}
      className={size === "normal" ? "drop-block" : "big-drop-block"}
      onDragEnter={dragEnter}
      onDragOver={allowDrop}
      onDragLeave={dragLeave}
      onDrop={drop}
    >
    </div>
  )
}
export default DropBlock