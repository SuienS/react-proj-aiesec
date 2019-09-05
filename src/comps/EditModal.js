import React, { Component } from 'react'
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';


class EditModal extends Component {


  //Editing opportunity data
  updateOpportunity() {
    ///https://api-staging.aiesec.org/v2/opportunities/8329?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c&api_key=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c

    /* 
        let { title, location} = this.state.editOpData;
        let req = 'https://api-staging.aiesec.org/v2/opportunities/';
        let key = '?api_key=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';//////////////000000
        console.log(req + this.state.editOpData.id);
        axios.patch(req + this.state.editOpData.id + key, {
          title, location
    
        }).then((response) => {
          this.refreshOpList();
        }); 
    */
   this.props.portal.setState({
      editOpModal: false, editOpData: { id: '', title: '', description: '' }
    })
  }


  render() {

    let portal = this.props.portal
    return (
      <Modal isOpen={portal.state.editOpModal} toggle={portal.toggleEditOpModal.bind(portal)}>
        <ModalHeader toggle={portal.toggleEditOpModal.bind(portal)}>Edit Opportunity</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input id="title" value={portal.state.editOpData.title} onChange={(e) => {

              let { editOpData } = portal.state;

              editOpData.title = e.target.value;

              portal.setState({ editOpData });

            }} />
          </FormGroup>


          <FormGroup>
            <Label for="description">Description</Label>
            <Input id="description" value={portal.state.editOpData.description} onChange={(e) => {

              let { editOpData } = portal.state;

              editOpData.description = e.target.value;
              console.log(editOpData.description);
              portal.setState({ editOpData });

            }} />

          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateOpportunity.bind(this)}>Update Opportunity</Button>{' '}
          <Button color="secondary" onClick={portal.toggleEditOpModal.bind(portal)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditModal