import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CandidateService from '../../service/CandidateService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const emptyOption = { value: "", label: "" };
const initialValue = undefined;

class CandidateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
			name: '',
			age: '',
			phone: '',
			email: '',
			qualification: '',
			experience: '',
            selectedFile: null
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
		this.cancelForm = this.cancelForm.bind(this)

    }

    componentDidMount() {
        console.log(this.state.id)
			
        // eslint-disable-next-line
        if (this.state.id === -1) {
            return
        }

        CandidateService.retrieveCandidate(this.state.id)
            .then(response => this.setState({
				name: response.data.name,
				age: response.data.age,
				phone: response.data.phone,
                email: response.data.email,
				qualification: response.data.qualification,
				experience: response.data.experience
            }));
		
    }

    onFileChangeHandler=event=>{
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })

    }

    validate(values) {
        let errors = {}
        if (!values.name) {
            errors.name = 'Please Enter Name'
        } else if (values.name.length < 5) {
            errors.name = 'Enter atleast 5 Characters in Name'
        }
		if (!values.qualification) {
            errors.qualification = 'Please Select qualification'
        }
		if (!values.experience) {
            errors.experience = 'Please Enter no of years of experience'
        }
        return errors

    }

    onSubmit(values) {
		try {
            const candidate = new FormData();
            candidate.append('id', this.state.id);
            candidate.append('name', values.name);
            candidate.append('age', values.age);
            candidate.append('phone', values.phone);
            candidate.append('email', values.email);
            candidate.append('qualification', values.qualification);
            candidate.append('experience', values.experience);
            candidate.append('file', this.state.selectedFile);
			if (this.state.id == -1) {
				CandidateService.createCandidate(candidate)
					.then(() => this.props.history.push('/'))
			} else {
				CandidateService.updateCandidate(this.state.id, candidate)
					.then(() => this.props.history.push('/'))
			}
			console.log(values);
		} catch (e) {
        console.error(e);
    }
    }

	cancelForm() {
        this.props.history.push(`/`)
    }
	
    render() {

        let { id, name, age, phone, email, qualification, experience } = this.state

        return (
            <div><button className="btn btn-primary float-right" onClick={() => this.cancelForm()} type="button">{"<< Back"}</button>
                <h3>Candidate</h3> 
                <div className="container">
				
                    <Formik
                        initialValues={{ id, name, age, phone, email, qualification, experience }}
                        onSubmit={this.onSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                    <Form>
                                        <fieldset className="form-group" hidden>
                                            <label className="float-left">Id</label>
                                            <Field className="form-control" type="text" name="id" disabled/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label class="float-left">Name</label>
                                            <Field className="form-control" type="text" name="name" />
                                            <ErrorMessage name="name" component="div" className="alert alert-danger" />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label class="float-left" htmlFor="file">Resume</label>
                                            <input className="form-control" type="file" name="file" accept=".docx, .pdf" onChange={this.onFileChangeHandler}/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="float-left">Age</label>
                                            <Field className="form-control" type="text" name="age"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="float-left">Phone No</label>
                                            <Field className="form-control" type="text" name="phone"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="float-left">Email</label>
                                            <Field className="form-control" type="text" name="email"/>
                                            <ErrorMessage name="name" component="div" className="alert alert-danger"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label class="float-left">Last Qualification</label>
                                            <Field as="select" className="form-control" name="qualification">
                                                <option value={emptyOption.value}>{emptyOption.label}</option>
                                                <option value="Business">PHD</option>
                                                <option value="Research">MS</option>
                                                <option value="IT">BS</option>
                                                <option value="Service">Intermediate</option>
                                                <option value="Service">Matriculation</option>
                                            </Field>
                                            <ErrorMessage name="type" component="div" className="alert alert-danger" />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="float-left">Experience</label>
                                            <Field className="form-control" type="text" name="experience"/>
                                            <ErrorMessage name="name" component="div" className="alert alert-danger"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                        <button className="btn btn-cancel" onClick={() => this.cancelForm()} type="button">Cancel</button>
                                    </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default CandidateComponent
