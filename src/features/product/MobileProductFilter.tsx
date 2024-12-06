import Modal from '../ui/Modal';
import ProductFilter from './ProductFilter';
import { FaFilter } from 'react-icons/fa';

function MobileProductFilter() {
  return (
    <Modal>
      <Modal.Open opens="filter">
        <FaFilter className="text-4xl cursor-pointer" />
      </Modal.Open>
      <Modal.Window name="filter">
        <ProductFilter />
      </Modal.Window>
    </Modal>
  );
}

export default MobileProductFilter;
