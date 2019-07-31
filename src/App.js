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
        /*
        this.setState({imageUrl:this.state.input})
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL, 
            this.state.input).then(
            function(response) {
                console.log();
                
                console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            },
            function(err) {
                console.log(err);
            }
        );
        
        */
       //IMPORTANT: INSTEAD OF USING THE CODE ABOVE, WHERE WE MUST COPY INPUT IN IMAGEURL
       //BUT USE THE FIRST ONE TO REQUEST THE FACE FOR TIMING REASONS,
       //WE USE SET STATE WITH CALLBACK. WE CAN SET THE STATE AND AFTERWARD we call the api
       this.setState({imageUrl:this.state.input}, () => {
            app.models.predict(
                Clarifai.FACE_DETECT_MODEL, 
                this.state.imageUrl).then(
                function(response) {
                    console.log('adsadadasdsad');
                    
                    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
                },
                function(err) {
                    console.log(err);
                }
            );
        })
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