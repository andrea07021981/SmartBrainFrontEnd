import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import Rank from './components/rank/Rank'
import Clarifai from 'clarifai'
import './App.css'


import { ParticleOptions } from './components/particle/ParticleOptions'
import { ClarifaiKey } from './components/clarifaikey/ClarifaiKey'

//NPM parts
import Particles from 'react-particles-js';

//IMPORTANT FOR CLARIFAI
const app = new Clarifai.App({
    apiKey: ClarifaiKey.key
});

class App extends Component{

    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    onInputChange = (event) => {
        console.log(event);
        //
        this.setState({input:event.target.value})
    }

    onButtonSubmit = () => {
        console.log('click');
        app.models.predict(ClarifaiKey.key, 'https://samples.clarifai.com/puppy.jpeg').then(
            function(response) {
                console.log(response);
            },
            function(err) {

            }
        );
    }

    render() {
        return (
            <div className='App'>
            <Particles className='particles'
                params={ParticleOptions} />
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit}
                />
                {/* <FaceRecognition/> */}
            </div>
        )
    }
}

export default App;