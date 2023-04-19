import React from 'react';
import {Modal, ModalBody} from 'reactstrap';

const PictureDialog = ({ isOpen, handleClose, imageName, imageSrc }) => {
  return (
    <Modal maxWidth="md" fullWidth={true} fullScreen={false} open={isOpen} onClose={handleClose}>
      <ModalBody>
      <img
        style={{
        width: "90%",
        height: "auto",
        display: "block",
        margin: "0 auto",
        }}
        alt={imageName}
        src={imageSrc}
      />
      </ModalBody>
    </Modal>


  );
}
 
export default PictureDialog;