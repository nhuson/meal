import React from 'react'
import Immutable from "immutable"
import {
    Form,
    Schema,
    Field,
    Chooser,
    TextEdit,
    formGroup,
    formList,
    FormEditStates
} from "@nhuson/react-dynamic-forms"

/**
 * Renders a form for entering an email address
 */
class EmailForm extends React.Component {
    static defaultValues = { id: 2, amount: 1 };

    static schema = (
        <Schema>
            <Field
                name="amount"
                defaultValue=""
                label="amount"
                required={true}
            />
            <Field name="id" defaultValue={1} label="Type" required={true} />
        </Schema>
    );

    emailTypes() {
        return Immutable.fromJS([{ id: 1, label: "Onion" }, { id: 2, label: "Lemon" }]);
    }

    emailTypeLabel() {
        let result;
        this.emailTypes().forEach(obj => {
            if (obj.id === this.props.value.get("id")) {
                result = obj.label;
            }
        });
        return result;
    }

    render() {
        const {
            onChange,
            onMissingCountChange,
            value = EmailForm.defaultValues
        } = this.props;
        const callbacks = { onChange, onMissingCountChange };
        if (this.props.edit) {
            return (
                <Form
                    name={this.props.name}
                    schema={EmailForm.schema}
                    value={value}
                    edit={FormEditStates.ALWAYS}
                    labelWidth={50}
                    {...callbacks}
                >
                    <Chooser
                        field="id"
                        choiceList={this.emailTypes()}
                        disableSearch={false}
                        width={150}
                        value={1}
                    />
                    <TextEdit field="amount" width={300} />
                </Form>
            );
        } else {
            return (
                <Form
                    name={this.props.name}
                    schema={EmailForm.schema}
                    value={value}
                    edit={FormEditStates.TABLE}
                    labelWidth={50}
                    {...callbacks}
                >
                    <TextEdit field="amount" width={250} />
                    <Chooser
                        field="id"
                        choiceList={this.emailTypes()}
                        disableSearch={false}
                        width={250}
                        value={1}
                    />
                </Form>
            );
        }
    }
}

const EmailList = formList(EmailForm);
const Ingredients = formGroup(EmailList);

/**
 * Edit a contact
 */
class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: FormEditStates.ALWAYS,
            hasMissing: false,
            hasErrors: false
        };
    }

    schema() {
        return (
            <Schema>
                <Field name="ingredients" label="ingredients" />
            </Schema>
        );
    }

    handleMissingCountChange(form, missingCount) {
        this.setState({ hasMissing: missingCount > 0 });
        if (this.props.onMissingCountChange) {
            this.props.onMissingCountChange(form, missingCount);
        }
    }

    handleErrorCountChange(form, errorCount) {
        this.setState({ hasErrors: errorCount > 0 });
        if (this.props.onErrorCountChange) {
            this.props.onErrorCountChange(form, errorCount);
        }
    }

    handleChange(form, value) {
        if (this.props.onChange) {
            this.props.onChange(form, value);
        }
    }

    handleSubmit() {
        this.setState({
            editMode: FormEditStates.SELECTED
        });
    }

    renderSubmit() {
        let submit;
        if (this.state.editMode === FormEditStates.ALWAYS) {
            let disableSubmit = true;
            let helperText = "";
            if (this.state.hasErrors === false && this.state.hasMissing === false) {
                disableSubmit = false;
            } else {
                helperText =
                    this.state.hasErrors === true
                        ? "* Unable to save because while form has errors"
                        : "* Unable to save because the form has some missing required fields";
            }
            submit = (
                <div>
                    <span>
                        <button
                            type="submit"
                            className="btn btn-default"
                            disabled={disableSubmit}
                            onClick={() => this.handleSubmit()}
                        >
                            Save
                        </button>
                    </span>
                    <span
                        style={{
                            fontSize: 12,
                            paddingLeft: 10,
                            color: "orange"
                        }}
                    >
                        {helperText}
                    </span>
                </div>
            );
        } else {
            submit = <div>* Make changes to the form by clicking the pencil icons</div>;
        }
        return submit;
    }

    render() {
        const style = { background: "#FAFAFA", padding: 10, borderRadius: 5 };
        const { value } = this.props;
        const ingredients = value.get("ingredients");
        return (
            <div className="col-md-8">
                <Form
                    field="contact-form"
                    style={style}
                    schema={this.schema()}
                    value={value}
                    edit={this.state.editMode}
                    labelWidth={100}
                    onSubmit={() => this.handleSubmit()}
                    onChange={(fieldName, value) => this.handleChange(fieldName, value)}
                >
                    <Ingredients field="ingredients" value={ingredients} />
                    <hr />
                </Form>
                <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-9">{this.renderSubmit()}</div>
                </div>
            </div>
        );
    }
}

class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            value: new Immutable.fromJS({
                ingredients: [
                    { amount: 1, id: 1 },
                    { amount: 2, id: 2 }
                ]
            })
        };
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleErrorCountChange = this.handleErrorCountChange.bind(this);
        this.handleMissingCountChange = this.handleMissingCountChange.bind(this);
    }

    componentDidMount() {
        // Simulate ASYNC state update
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 0);
    }

    handleChange(form, value) {
        this.setState({ value });
    }

    handleMissingCountChange(form, missing) {
        this.setState({ hasMissing: missing > 0 });
    }

    handleErrorCountChange(form, errors) {
        this.setState({ hasErrors: errors > 0 });
    }

    handleAlertDismiss() {
        this.setState({ data: undefined });
    }

    renderContactForm() {
        if (this.state.loaded) {
            return (
                <ContactForm
                    value={this.state.value}
                    onChange={this.handleChange}
                    onMissingCountChange={this.handleMissingCountChange}
                    onErrorCountChange={this.handleErrorCountChange}
                />
            );
        } else {
            return (
                <div style={{ marginTop: 50 }}>
                    <b>Loading...</b>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">{this.renderContactForm()}</div>
                    <div className="col-md-4">
                        <b>STATE:</b>
                        <pre style={{ borderLeftColor: "steelblue" }}>
                            value = {JSON.stringify(this.state.value.toJSON(), null, 3)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}


export default Ingredient
