//STYLES
import Styles from './Pagination.module.css';

const Pagination = ({ currentPage, elementsPerPage, totalElements, onPageChange }) => {
    const totalPages = Math.ceil(totalElements / elementsPerPage)
    const pages = [...Array(totalPages).keys()].map(page => page + 1)  
    return (
      <div className={Styles.PaginatinoDiv}>
          {pages.map(page => (
              <button  className={Styles.BtnPagination} onClick={() => onPageChange(page)}>{page}</button>
          ))}
      </div>
    );
  }

  export default Pagination