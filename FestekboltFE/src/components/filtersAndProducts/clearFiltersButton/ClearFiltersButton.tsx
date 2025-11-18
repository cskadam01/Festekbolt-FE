import styles from "./ClearFiltersButton.module.css";
import { useFilter } from "../../../contexts/FilterContext";
import { FaTrash } from "react-icons/fa";

export const ClearFiltersButton = () => {
    const { reset } = useFilter();

    return (
        <button
            className={styles.clearFiltersButton}
            id="clearFiltersButton"
            onClick={() => {
                reset();
            }}
            >
            Szűrők törlése <FaTrash />
        </button>
    )
}
