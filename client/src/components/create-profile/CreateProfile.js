import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaField';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {createProfile} from '../../actions/profileActions';

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            bio: '',
            githubusername: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }


    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        console.log('submit');
        this.props.createProfile(profileData, this.props.history);

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors, displaySocialInputs} = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        // Select options for status
        const options = [
            {
                label: '* Select Profession Status',
                value: 0
            },
            {
                label: 'Developer', value: 'Developer'
            },
            {
                label: 'Junior Developer', value: 'Junior Developer'
            },
            {
                label: 'Senior Developers', value: 'Senior Developer'
            },
            {
                label: 'Manger', value: 'Manger'
            },
            {
                label: 'Student or Learning', value: 'Student or Learning'
            },
            {
                label: 'Instructor or Teaching', value: 'Instructor or Teaching'
            },
            {
                label: 'Intern', value: 'Intern'
            },
            {
                label: 'Other', value: 'Other'
            }
        ];
        return (
            <div className={"create-profile"}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get Some Information to make your Profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name={"handle"}
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info={"A unique handle for your profile URL. Your full name, company name, and nickname"}
                                />

                                <SelectListGroup
                                    placeholder="Status"
                                    name={"status"}
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info={"Give us an idea of where you are at in your career"}
                                />

                                <TextFieldGroup
                                    placeholder="Company"
                                    name={"company"}
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info={"Could be your own company or one you work for "}
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }}
                                        className="btn btn-light"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>

                                {socialInputs}

                                <input type={"submit"} value={"Submit"}
                                       className={"btn btn-info btn-block mt-4"}></input>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

CreateProfile.prototypes = {
    profile: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));