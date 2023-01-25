import React, { Component } from "react";
import AddPhone from "../AddPhone/Addphone.jsx";
import PhoneBookTable from "../PhoneBookTable/PhoneBookTable.jsx";
import styles from "./App.module.css";
import back from "./images/back.png";
import addContact from "./images/add.png";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnState: false,
      logoCheck: addContact,
      infoeditContact: {},
      phoneBook: [],
    };
    this.StatePage = this.StatePage.bind(this);
  }
  StatePage() {
    this.setState({
      btnState: !this.state.btnState,
      logoCheck: this.state.logoCheck === back ? addContact : back,
    });
  }
  getDataContactFromAddPhone = (contact) => {
    this.state.phoneBook = this.state.phoneBook.filter(
      (item) => item.id !== contact.id
    );
    this.setState({ phoneBook: [...this.state.phoneBook, contact] });
  };
  setDataContact = (contact) => {
    this.setState({ phoneBook: contact });
  };
  goToAddPhone = (contact) => {
    this.setState({
      infoeditContact: contact,
    });
    this.StatePage();
  };
  render() {
    return (
      <div className={styles.home}>
        <img
          onClick={this.StatePage}
          className={styles.imgBack}
          src={this.state.logoCheck}
          alt=""
        />
        <div className={styles.phoneBook}>
          {this.state.btnState ? (
            <div>
              <AddPhone
                contactEdit={this.state.infoeditContact}
                contacts={this.state.phoneBook}
                contactSetter={this.getDataContactFromAddPhone}
              />{" "}
            </div>
          ) : (
            <PhoneBookTable
              contacts={this.state.phoneBook}
              contactSetter={this.setDataContact}
              editContact={this.goToAddPhone}
            />
          )}
        </div>
      </div>
    );
  }
}
