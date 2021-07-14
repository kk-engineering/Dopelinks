import React, {
    Component,
    createRef
} from 'react';
import PropTypes from 'prop-types';
import { auth, firebase } from '../firebase';
import FileUploader from 'react-firebase-file-uploader';
import * as fire from 'firebase';
import AmazonIcon from '../images/amazon.png';
import Header from '../components/Header';

class Form extends Component {
    constructor(props) {
        super(props);

        this.email = createRef();
        this.password = createRef();
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            userImage: '',
            uid: ''
        };

        firebase.auth.onAuthStateChanged(user => user && this.setState({
            uid: user.uid
        }));
    }

    handleSuccess() {
        this.resetForm();
        this.props.onSuccess && this.props.onSuccess();
    }

    handleErrors(reason) {
        this.props.onError && this.props.onError(reason);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            email,
            password,
            userImage,
            props: { action }
        } = this;

        auth.userSession(
            action,
            email.current.value,
            password.current.value
        ).then(this.handleSuccess).catch(this.handleErrors);


    }

    handleChange = e => {
        var file = e.target.files[0];
        this.setState(() => ({ userImage: file }));
    }

    resetForm() {
        if (!this.email.current || !this.password.current) { return }
        const { email, password } = Form.defaultProps;
        this.email.current.value = email;
        this.password.current.value = password;
    }

    render() {
        return ([
            <Header />,
            <form onSubmit={this.handleSubmit}>
                <div className="create-link">
                    <div className="create-link-wrapper">
                        <div className="create-link-container">
                            <h1 className="body" style={{ color: 'rgb(97, 228, 240)', fontSize: '30px', fontWeight: 'bold' }}>{this.props.title}</h1>
                            <br />
                            <p className="body" align="left" style={{ color: 'grey', fontSize: '14px' }}> Email: </p>
                            <div><input className="form-field-input"
                                name="name"
                                type="email"
                                ref={this.email}
                            /></div>
                            <br />
                            <p className="body" style={{ color: 'grey', fontSize: '14px' }}> Password: </p>
                            <div>
                                <input className="form-field-input"
                                    name="password"
                                    type="password"
                                    ref={this.password}
                                />
                            </div>
                            <br />
                            <br />

                            <div className="create-link">
                                <div className="create-link-wrapper">
                                    <div className="create-link-container">
                                        <button type="submit" className="form-submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form >
        ])
    }
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
}

Form.defaultProps = {
    errors: '',
    email: '',
    password: ''
}

export default Form;