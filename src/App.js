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
            imageUrl: '',
            box: {}
        }
    }

    calculateFaceLocation = (data) => {
        console.log('Data:', data.outputs[0].data.regions[0].region_info.bounding_box);
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const img = document.getElementById('inputImage');
        const width = Number(img.width);
        const height = Number(img.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = box => {
        console.log(box);
        
        this.setState({box: box})
    }
    onInputChange = (event) => {
        this.setState({input:event.target.value})
    }

    onButtonSubmit = () => {
        /*
        this.setState({imageUrl:this.state.input})
        app.models.predict(
                Clarifai.FACE_DETECT_MODEL, 
                this.state.input)
                .then(response => this.calculateFaceLocation(response)
                .catch(err => console.log(err))
                );
        
        */
       //IMPORTANT: INSTEAD OF USING THE CODE ABOVE, WHERE WE MUST COPY INPUT IN IMAGEURL
       //BUT USE THE FIRST ONE TO REQUEST THE FACE FOR TIMING REASONS,
       //WE USE SET STATE WITH CALLBACK. WE CAN SET THE STATE AND AFTERWARD we call the api
       //WE also changed the then catch with async / await
       this.setState({imageUrl:this.state.input}, async () => {
            let apiResponce = await app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl);
            await this.displayFaceBox(this.calculateFaceLocation(apiResponce));
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
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
        )
    }
}

export default App;