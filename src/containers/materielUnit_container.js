import {connect} from 'react-redux';
import MaterielUnit from '../components/materiel/MaterielUnit/MaterielUnit';

const mapStateToProps = (state) => {
    return {
        materielUnit: state.materielUnit
    }
};

export default connect(mapStateToProps)(MaterielUnit);