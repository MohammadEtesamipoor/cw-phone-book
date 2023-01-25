import React, { Component } from "react";
import styles from "./PhoneBookTable.module.css";
import editImg from "../Application/images/edit.png";
import deleteImg from "../Application/images/delete.png";
import clsoeModal from "../Application/images/close-modal.png";
import comfirmContactIcon from "../Application/images/icons8-checked-radio-button-50.png";
export default class PhoneBookTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      newContactList: [],
      contactDelete: {},
      contactEdit: {},
    };
  }

  async deleteContactIcon(id) {
    this.setState({
      modal: true,
    });
    let selectContactDelete = this.props.contacts.find((c) => c.id === id);
    // this.deleteContact(selectContactDelete)
    await this.setState({
      contactDelete: selectContactDelete,
    });
  }

  deleteContact() {
    this.props.contactSetter(
      this.props.contacts.filter(
        (contact) => contact.id !== this.state.contactDelete.id
      )
    );
    this.closeModal();
  }

  closeModal() {
    this.setState({
      modal: false,
    });
  }

  async editContactIcon(id) {
    let selectContactEdit = this.props.contacts.find((c) => c.id === id);
    await this.setState({
      contactEdit: selectContactEdit,
    });
    this.props.editContact(this.state.contactEdit);
  }
  render() {
    return (
      <div>
        <div className={this.state.modal ? styles.pagePhoneTable : null}></div>
        {/* close Modal */}
        <div
          className={
            this.state.modal
              ? styles.deleteCardModal
              : styles.deleteCardModalClosed
          }
        >
          <div className={styles.infoContactDelete}>
            <h5>Are you sure you want to delete contact</h5>
            <h2>
              {this.state.contactDelete.firstName +
                " " +
                this.state.contactDelete.lastName}
            </h2>
          </div>
          <img
            onClick={() => this.closeModal()}
            className={styles.closeModal}
            src={clsoeModal}
            alt=""
          />
          <img
            onClick={() => this.deleteContact()}
            className={styles.comfirmContactIcon}
            src={comfirmContactIcon}
            alt=""
          />
        </div>

        {/* //table */}
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.contacts.length > 0 &&
              this.props.contacts.map((user, index) => (
                <tr key={user?.id}>
                  <td>{user?.firstName}</td>
                  <td>{user?.lastName}</td>
                  <td>{user?.phoneNumber}</td>
                  <td>{user?.gmail}</td>
                  <td>
                    <img
                      onClick={() => this.editContactIcon(user?.id)}
                      src={editImg}
                      alt=""
                    />
                  </td>
                  <td>
                    <img
                      onClick={() => this.deleteContactIcon(user?.id)}
                      src={comfirmContactIcon}
                      alt=""
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
