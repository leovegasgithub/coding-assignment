import React from "react";
import CSS from "../styles/modal.module.scss";

interface IParentProps {
  children: React.ReactNode;
  onClose: () => unknown;
}

const Modal = ({ children, onClose }: IParentProps) => {
  return (
    <div className={CSS.Modal}>
      <div className={CSS.ModalInner}>
        <button onClick={() => onClose()}>Close</button>
        {children}</div>
    </div>
  );
};

export default Modal;