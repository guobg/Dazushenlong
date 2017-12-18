import {connect} from 'react-redux';
import Materiel from '../components/materiel/Materiel/Materiel';

const mapStateToProps = (state) => {
    return {
        materiel: state.materiel,
        materielUnit: state.materielUnit
    }
};

export default connect(mapStateToProps)(Materiel);