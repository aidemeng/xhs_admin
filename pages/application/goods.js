import { useState } from 'react'
import DragBlock from '../../components/DragBlock'
import DropBlock from '../../components/DropBlock'

export default function Goods() {

  const [selectId, setSelectId] = useState('')
  const handleSelect = (selectId) => {

  }
  
  return (
    <div className="goods-wrapper">
      <div className="drag-blocks">
        <DragBlock id="123456" />
        <DragBlock />
        <DragBlock />
      </div>
      <div className="drop-blocks" onSelect={handleSelect}>
        <DropBlock id="123456" />
        <DropBlock />
        <DropBlock />
      </div>
      <style jsx>{`
        .goods-wrapper {
          display: flex;
        }
        .drag-blocks {
          width: 150px;
          
          margin: 30px 0;
          border: 1px solid #777;
        }
        .drop-blocks {
          width: 200px;
          min-height: 400px;
          margin: 30px 50px;
          border: 1px solid #777;
          border-radius: 30px
        }
      `}</style>
    </div>
    
  )
  
}