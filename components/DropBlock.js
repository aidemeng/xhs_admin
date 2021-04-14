import { Component } from 'react'
import './styles/block.css'

export default class DropBlock extends Component {
  
  //拖动鼠标到另一个可接受区域
  dragEnter = (e) => {
    e.target.style.height = '100px'
    e.target.style.background = 'rgb(221, 50, 34)'
    e.target.style.border = 'none'
    e.target.style.borderRadius = '20px'
  }

  //当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
  drop = (e) => {
    e.preventDefault()
    // const selectId = e.dataTransfer.getData("good");
    // this.props.onSelect(selectId)
  }

  //a拖到b，离开b的时候触发
  dragLeave = (e) => {
    e.target.style.height = '40px'
    e.target.style.background = '#eaeaea'
    e.target.style.border = '1px dashed #666'
    e.target.style.borderRadius = '10px'
  }

  allowDrop = (e) => {
	  e.preventDefault();
  }

  render() {
    const {id} = this.props
  
    return (
      <div
        id={id}
        className="drop-block"
        onDragEnter={this.dragEnter}
        onDragOver={this.allowDrop}
        onDragLeave={this.dragLeave}
        onDrop={this.drop}
      >
      </div>
    )
  }
}