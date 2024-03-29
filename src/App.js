import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'
import './App.css'


import { ParticleOptions } from './components/particle/ParticleOptions'

//NPM parts
import Particles from 'react-particles-js';

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
class App extends Component{

    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({user: 
            {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) => {
        console.log(data);
        
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        console.log('image',image);
        
        const width = Number(image.width);
        const height = Number(image.height);
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

    onPictureSubmit = () => {
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
       this.setState({imageUrl:this.state.input}, () => {
            let header = new Headers({
                "Content-Type": "application/json"
            });

            let signInPost = {
                method: 'POST',
                headers: header,
                body: JSON.stringify({
                    input: this.state.input
                })
            }

            fetch('https://whispering-taiga-19794.herokuapp.com/imageurl', signInPost)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    let signInPut = {
                        method: 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    }
                    fetch('https://whispering-taiga-19794.herokuapp.com/image', signInPut)
                    .then(response => response.json())
                    .then(count => {
                        //-------------------IMPORTANT  
                        //WE MUST USE Object.assign() WHEN WE UPDATE ONE ELEMENT OF THE ARRAY
                        this.setState(Object.assign(this.state.user, { entries: count}))
                    })
                    .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
            })
            .catch(err => console.log(err));
        })
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }

    render() {
        const {route, isSignedIn, box, imageUrl} = this.state;
        return (
            <div className='App'>
            <Particles className='particles'
                params={ParticleOptions} />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
                {route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onPictureSubmit={this.onPictureSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                    : (
                        route === 'signin' || route === 'signout'
                        ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                        : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                    )
                }
            </div>
        )
    }
}

export default App;