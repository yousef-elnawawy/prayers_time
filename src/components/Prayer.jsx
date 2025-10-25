import React from 'react'

export default function Prayer({ img , title , time }) {
  return (
            <div className="card bg-white shadow-md rounded-md">
              <div className="img">
                <img src={img} alt="" />
              </div>
              <div className="p-4">
              <div className="card-title">
                <h3 className="text-xl text-green-700 font-semibold mb-2">{title}</h3>
              </div>
              <div className="card-body">
                <div className="time text-3xl text-gray-700 font-light">{time}</div>
              </div>
              </div>
            </div>
  )
}
