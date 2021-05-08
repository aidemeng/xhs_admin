
export default function PhoneView(props) {
  const {children} = props

  return (
    <div className="phone-view">
      <div className="header"></div>
      <div className="container">
        {children}
      </div>
      <div className="footer">
        <div className="btn"></div>
      </div>
      <style jsx>{`
        .phone-view {
          height: 500px;
          border: 1px solid #666;
          border-radius: 30px;
          position: relative;
        }
        .header {
          width: 40px;
          height: 5px;
          margin: 10px auto;
          background: #aaa;
          border-radius: 5px
        }
        .container {
          border-top: 1px dashed #666;
        }
        .footer {
          width: 100%;
          position: absolute;
          bottom: 0;
          border-top: 1px dashed #666;
        }
        .footer .btn {
          width: 27px;
          height: 27px;
          margin: 3px auto;
          background: #ccc;
          border: 1px solid #666;
          border-radius: 50%;
        }
      `}</style>
    </div>
  )
} 