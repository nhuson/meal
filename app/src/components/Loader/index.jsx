import React from 'react';
import { PacmanLoader } from 'react-spinners';

class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className='sweet-loading'>
                <PacmanLoader
                    sizeUnit={"px"}
                    size={15}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Loader
