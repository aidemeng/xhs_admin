import { Component } from 'react'
import './styles/block.css'

export default class DragBlock extends Component {

  //拖动事件
  drag = (e) => {
    e.dataTransfer.setData("good", e.target.id)
  }

  //
  handleDragEnd = (e) => {
    e.target.style.height = '80px'
    e.target.style.background = 'rgb(233, 92, 86, 0.5)'
    e.target.style.borderRadius = '15px'
  }

  render() {
    const {id} = this.props
  
    return (
      <div
        id={id}
        draggable="true"
        className="drag-block"
        onDragStart={this.drag}
        onDragEnd={this.handleDragEnd}
      >
      </div>
    )
  }
}