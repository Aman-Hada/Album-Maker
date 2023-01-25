import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyVerticallyCenteredModal= (props)=> {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>{props.img}</h4>
        <p>
        <img alt={props.img_id} src={props.img_src}></img>
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.onHide} variant="danger">Delete</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export const Modals =({img_src, img_id})=> {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    <img src={img_src} alt={img_id} onClick={()=>{setModalShow(true)}}/>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        img_src={img_src}
        img_id={img_id}
      />
    </>
  );
}
