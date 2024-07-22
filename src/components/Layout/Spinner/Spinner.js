import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import './Spinner.scss'

const Spinner = ({ show, hideAction }) => {
  useEffect(() => {
  }, [show])

  return (
    <Modal
      className="Spinner"
      contentClassName="spinner-modal-content"
      dialogClassName="spinner-modal-dialog"
      show={show}
      onHide={hideAction}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="lds-hourglass"></div>
    </Modal>
  )
}

export default Spinner
