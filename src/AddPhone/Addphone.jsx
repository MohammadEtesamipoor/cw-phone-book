import React, { Component } from "react";
import styles from "./Addphone.module.css";

export default class Addphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendDataContactToParent = this.sendDataContactToParent.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.state.contact["id"] =
      Object.keys(this.props.contactEdit).length == 0
        ? this.props.contacts.length + 1
        : this.props.contactEdit.id;
    for (let i = 0; i < e.target.length - 1; i++) {
      await this.setState({
        contact: {
          ...this.state.contact,
          [e.target[i].name]: e.target[i].value,
        },
      });
    }
    this.sendDataContactToParent(this.state.contact);
    this.state.contact = {};
  }

  sendDataContactToParent(contact) {
    this.props.contactSetter(contact);
  }
  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <InputComponent
          valueInput={
            Object.keys(this.props.contactEdit).length == 0
              ? null
              : this.props.contactEdit.firstName
          }
          placeholder="First Name"
          name="firstName"
          lable="First Name"
          required
        />
        <InputComponent
          valueInput={
            Object.keys(this.props.contactEdit).length == 0
              ? null
              : this.props.contactEdit.lastName
          }
          placeholder="Last Name"
          name="lastName"
          lable="Last Name"
        />
        <InputComponent
          valueInput={
            Object.keys(this.props.contactEdit).length == 0
              ? null
              : this.props.contactEdit.phoneNumber
          }
          placeholder="+98"
          name="phoneNumber"
          lable="Phone Number"
          type="number"
        />
        <InputComponent
          valueInput={
            Object.keys(this.props.contactEdit).length == 0
              ? null
              : this.props.contactEdit.gmail
          }
          placeholder="Gmail"
          name="gmail"
          lable="Email Address"
          type="email"
        />
        <button className={styles.btnSubmit} type="submit">
          Save Contact
        </button>
      </form>
    );
  }
}

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgValidation: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //Form Validation
  handleChange(e) {
    let msgValidation = "";
    //Form Validation
    e.target.setCustomValidity("");
    switch (e.target.name) {
      case "firstName":
        if (e.target.value.length > 15) {
          msgValidation = "The first name must be less than 10 characters";
          e.target.setCustomValidity(
            "The first name must be less than 10 characters"
          );
        } else {
          msgValidation = "";
          e.target.setCustomValidity("");
        }
        break;
      case "lastName":
        if (e.target.value.length > 20) {
          msgValidation = "The last name must be less than 15 characters";
          e.target.setCustomValidity(
            "The last name must be less than 15 characters"
          );
        } else {
          msgValidation = "";
          e.target.setCustomValidity("");
        }
        break;
      case "phoneNumber":
        if (e.target.value.length !== 11) {
          msgValidation = "The phone number must be 11 digits";
          e.target.setCustomValidity("The phone number must be 11 digits");
        } else {
          msgValidation = "";
          e.target.setCustomValidity("");
        }
        break;
      case "gmail":
        if (!/@gmail\.com$/.test(e.target.value.toLowerCase())) {
          msgValidation = "Invalid email address format";
          e.target.setCustomValidity("Invalid email address format");
        } else {
          msgValidation = "";
          e.target.setCustomValidity("");
        }
        break;
      default:
        msgValidation = "";
        break;
    }
    this.setState({
      msgValidation: msgValidation,
    });
  }

  render() {
    return (
      <div className={styles.inputStyle}>
        <label className={styles.label} htmlFor="">
          {this.props.lable}
        </label>
        <input
          defaultValue={this.props.valueInput}
          className={styles.inputValue}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          name={this.props.name}
          required
        />
        <span className={styles.spanMsgValid}>{this.state.msgValidation}</span>
      </div>
    );
  }
}
