import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/facerecognition/FaceRecognition'
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
            input: '',
            imageUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({input:event.target.value})
    }

    onButtonSubmit = () => {
        this.setState({imageUrl:this.state.input})
        app.models.predict(
            Clarifai.COLOR_MODEL, 
            this.state.input).then(
            function(response) {
                console.log(response);
            },
            function(err) {
                console.log(err);
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
                <FaceRecognition imageUrl={this.state.imageUrl}/>
            </div>
        )
    }
}

export default App;