import React from 'react'
import { Row } from 'react-bootstrap'
import './Pagination.scss'

const Pagination = ({ count, page, setPage }) => {
  const handleClickPrev = () => {
    if (page !== 1) setPage(page - 1)
  }

  const handleClickNext = () => {
    if (page !== count) setPage(page + 1)
  }

  return (
    <Row className="pagination-area">
      <div className="pagination-container">
        <span className="pagination-buttons" onClick={handleClickPrev}>
          <i className="far fa-angle-left"></i>
        </span>
        <span> Page</span>
        <span className="pagination-buttons">{ page }</span>
        <span> of {count} </span>
        <span className="pagination-buttons" onClick={handleClickNext}>
          <i className="far fa-angle-right"></i>
        </span>
      </div>
    </Row>
  )
}

export default Pagination
