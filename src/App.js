import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import Rank from './components/rank/Rank'
import './App.css'

import { ParticleOptions } from './components/particle/ParticleOptions'

//NPM parts
import Particles from 'react-particles-js';


class App extends Component{

    render() {
        return (
            <div className='App'>
            <Particles className='particles'
                params={ParticleOptions} />
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm/>
                {/* <FaceRecognition/> */}
            </div>
        )
    }
}

export default App;