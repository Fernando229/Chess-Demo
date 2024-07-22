import React, { useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Form from 'react-bootstrap/Form'
import RangeSlider from 'react-bootstrap-range-slider'
import './FilterArea.scss'

const FilterArea = ({
  status,
  setStatus,
  color,
  setColor,
  pClass,
  setPClass,
  bCount,
  setBCount,
  setSPiece,
  setSStyle
}) => {
  const handleClickStatus = (e) => {
    const temp = { ...status }
    temp[e.target.value] = e.target.checked
    setStatus(temp)
    resetSelectedItem()
  }

  const handleClickColor = (e) => {
    const temp = { ...color }
    temp[e.target.value] = e.target.checked
    setColor(temp)
    resetSelectedItem()
  }

  const handleClickClass = (e) => {
    const temp = { ...pClass }
    temp[e.target.value] = e.target.checked
    setPClass(temp)
    resetSelectedItem()
  }

  const handleChangeBCount = (e) => {
    setBCount(e.target.value)
    resetSelectedItem()
  }

  const resetSelectedItem = () => {
    if (setSPiece && setSStyle) {
      setSPiece('')
      setSStyle({})
    }
  }

  useEffect(() => {
  }, [])
  return (
    <>
      <h1 className="filter-title">
        <i className="fas fa-filter" style={{ color: '#0469ff' }}></i> Filter By
      </h1>
      <Accordion defaultActiveKey={['0']} alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Status</Accordion.Header>
          <Accordion.Body>
            <ul className="filter-item-list">
              <li className="filter-item">
                <Form.Check
                  inline
                  label="For sale"
                  name="status"
                  type="checkbox"
                  id="status-checkbox-forsale"
                  value="forsale"
                  onClick={handleClickStatus}
                  checked={status.forsale}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Not for sale"
                  name="status"
                  type="checkbox"
                  id="status-checkbox-notforsale"
                  value="notforsale"
                  onClick={handleClickStatus}
                  checked={status.notforsale}
                />
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Color</Accordion.Header>
          <Accordion.Body>
            <ul className="filter-item-list">
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Black"
                  name="color"
                  type="checkbox"
                  id="color-checkbox-black"
                  value="black"
                  onClick={handleClickColor}
                  checked={color.black}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="White"
                  name="color"
                  type="checkbox"
                  id="color-checkbox-white"
                  value="white"
                  onClick={handleClickColor}
                  checked={color.white}
                />
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Class</Accordion.Header>
          <Accordion.Body>
            <ul className="filter-item-list">
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Pawn"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-pawn"
                  value="p"
                  onClick={handleClickClass}
                  checked={pClass.p}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Knight"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-knight"
                  value="n"
                  onClick={handleClickClass}
                  checked={pClass.n}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Bishop"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-bishop"
                  value="b"
                  onClick={handleClickClass}
                  checked={pClass.b}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Rook"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-rook"
                  value="r"
                  onClick={handleClickClass}
                  checked={pClass.r}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="Queen"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-queen"
                  value="q"
                  onClick={handleClickClass}
                  checked={pClass.q}
                />
              </li>
              <li className="filter-item">
                <Form.Check
                  inline
                  label="King"
                  name="class"
                  type="checkbox"
                  id="class-checkbox-king"
                  value="k"
                  onClick={handleClickClass}
                  checked={pClass.k}
                />
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Breed Count</Accordion.Header>
          <Accordion.Body>
            <RangeSlider
              value={bCount}
              onChange={handleChangeBCount}
              max={7}
              tooltip="on"
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Attributes</Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default FilterArea
