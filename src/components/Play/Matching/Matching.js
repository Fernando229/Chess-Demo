import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Matching.scss'

export const Matching = ({ show, hideAction }) => {
  return (
    <Modal
      className="Matching"
      dialogClassName="matching-dialog"
      contentClassName="matching-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
      backdrop={false}
    >
      <h1 className="matching-title">Matching...</h1>
      <span className="close-button" onClick={hideAction}>X</span>
      <Button className="matching-cancel-btn" onClick={hideAction}>Cancel</Button>
    </Modal>
  )
}

export default Matching
