import Modal from './modal';
import EditCompnent from './EditComponet';

const HomePage = ()=>{
    return (
        <div className='flex items-center justify-center h-screen'>
            <Modal>
                <EditCompnent/>
            </Modal>
        </div>
    );
};
export default HomePage;