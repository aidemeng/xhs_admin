import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Statistic } from 'antd'
import { withRouter } from 'next/router'

import PhoneView from '../../components/goods/PhoneView'
import BlockProps from '../../components/goods/BlockProps'
import emitter from '../../utils/eventBus'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
* Moves an item from one list to another list.
*/
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result.removed = removed
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  console.log(result)
  return result
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  padding: grid,
  margin: `0 0 ${grid}px 0`,
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: 3,
  background: isDragging ? '#fcece7' : '#fff',

  ...draggableStyle
})

const selectedItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? '#fcece7' : '#e8fbf0',
  borderRadius: 25,
  
  ...draggableStyle
})

const goodListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#e8fbf0' : 'rgba(238, 238, 238, 0.5)',
  padding: grid,
  width: 200,
  height: 500,
  overflow: 'auto',
})

const selectedStyle = () => ({
  background: '#fff',
  padding: grid,
  width: 260,
  height: 438,
  overflow: 'auto'
})

class Goods extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      goodList: [],
      selected: [],
      block: {} 
    }
  }

  componentDidMount() {
    const goodList = JSON.parse(localStorage.getItem('goods'))
    if(goodList) {
      this.setState({ goodList })
    }

    this.eventEmitter = emitter.addListener('changeData', (value) => {
      const index = goodList.findIndex(item => item.itemId === value.itemId)
      const goods = JSON.parse(localStorage.getItem('goods'))

      goods.splice(index, 1, value)
      localStorage.setItem('goods', JSON.stringify(goods))
      this.setState({block: value})
    })
  }

  // 组件将要销毁时取消事件监听
  componentWillUnmount(){
    this.eventEmitter.remove()
  }
  
  handleSelect = (selectId) => {
    this.selectId = selectId
    const { selected } = this.state
    let block = {}
    for(let i in selected) {
      if(selected[i].itemId === selectId) {
        block = selected[i]
      }
    }
    this.setState({ block })
  }

  id2List = {
    component: 'goodList',
    application: 'selected'
  }

  getList = id => this.state[this.id2List[id]]

  onDragEnd = result => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      )

      let state = { goodList: items }

      if (source.droppableId === 'application') {
        state = { selected: items }
      }

      this.setState(state)
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )

      let block = {}
      this.selectId = null
      if(source.droppableId === 'component') {
        block = result.removed
        this.selectId = block.itemId
      }

      this.setState({
        block,
        goodList: result.component,
        selected: result.application
      })
    }
  }
  
  render() {
    const { block, goodList, selected } = this.state 

    return (
      <div className="goods-wrapper">
        <div className="left">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="component">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={goodListStyle(snapshot.isDraggingOver)}>
                  {goodList.map((item, index) => (
                    <Draggable
                      key={item.itemId}
                      draggableId={item.itemId}
                      index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Statistic
                            title="name"
                            value={item.name}
                            valueStyle={{color: '#12864e', fontSize: 15}}
                          />
                          <Statistic
                            title="key"
                            value={item.key}
                            valueStyle={{color: '#12864e', fontSize: 15}}
                          />
                        </div>
                        
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>  
              )}
            </Droppable>

            <Droppable droppableId="application">
              {(provided, snapshot) => (
                <PhoneView>
                  <div
                    ref={provided.innerRef}
                    style={selectedStyle()}>
                    {selected.map((item, index) => (
                      <Draggable
                        key={item.itemId}
                        draggableId={item.itemId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            onClick={this.handleSelect.bind(this, item.itemId)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={selectedItemStyle(
                              item.itemId === this.selectId,
                              provided.draggableProps.style
                            )}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                              <Statistic
                                title="name"
                                value={item.name}
                                style={{color: '#12864e'}}
                                valueStyle={{color: '#12864e', fontSize: 15}}
                              />
                              <Statistic
                                title="key"
                                value={item.key}
                                valueStyle={{color: '#12864e', fontSize: 15}}
                              />
                            </div>
                            <div style={{color: '#555', fontSize: 12, textAlign: 'right'}}>id:{item.itemId}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </PhoneView>
              )}
            </Droppable>
          </DragDropContext>
          
        </div>
        
        {this.selectId ? <BlockProps block={block} /> : null}
        
        <style jsx>{`
          .goods-wrapper {
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .left {
            width: 45%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
  
}

export default withRouter(Goods)