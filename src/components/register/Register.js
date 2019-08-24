import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerSurname: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (event) => this.setState({registerName: event.target.value});

    onSurnameChange = (event) => this.setState({registerSurname: event.target.value});
    
    onEmailChange = (event) => this.setState({registerEmail: event.target.value});

    onPasswordChange = (event) => this.setState({registerPassword: event.target.value});

    onSubmitRegister = () => {
        const { registerName, registerSurname, registerEmail, registerPassword} = this.state;
        let header = new Headers({
            "Content-Type": "application/json"
        });

        let registerPost = {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                name: registerName,
                password: registerSurname,
                email: registerEmail,
                password: registerPassword
            })
        }
        fetch('https://whispering-taiga-19794.herokuapp.com/register', registerPost)
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                console.log(user);
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
                                type="submit" 
                                value="Register" 
                                onClick={this.onSubmitRegister}/>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;