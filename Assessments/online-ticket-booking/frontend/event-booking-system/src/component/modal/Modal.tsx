const Modal = ({ closeModalCB, component }: any) => {
  return (
    <div className="modal-overlay " onClick={closeModalCB}>

      <div className="modal-content relative " onClick={(e) => e.stopPropagation()}>
    
    
        {component}
      </div>
    </div>
  );
};

export default Modal;
