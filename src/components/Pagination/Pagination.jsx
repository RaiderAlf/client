//STYLES
import Styles from './Pagination.module.css'

const Pagination = (props) => {

    const { currentPage, elementsPerPage, allDogs, setCurrentPage } = props

    return(
        <div>
            {
            currentPage === 1 ? ( <span></span> ) : ( <button className={Styles.BtnHome} onClick={setCurrentPage(currentPage + 1)} >PREV</button> )
            }
            <span className={Styles.BtnHome} >{currentPage}</span>
            {
                Math.ceil(allDogs.length /elementsPerPage) > currentPage ? ( <button className={Styles.BtnHome} onClick={setCurrentPage(currentPage - 1)} >NEXT</button> ) : ( <span></span> )
            }
        </div>
    )
}

export default Pagination