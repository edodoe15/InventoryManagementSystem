import { Card, Modal as MUIModal } from '@mui/material';
import './index.css';

const Modal = ({open, children, small}) => {
    return <MUIModal open={open} className='modal'>
        <Card className={`modal-sadrzaj ${small ? 'modal-sadrzaj-mali':''}`}>
            {children}
        </Card>
    </MUIModal>
}

export default Modal;