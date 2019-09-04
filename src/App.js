import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Jumbotron } from 'reactstrap';


class App extends Component {

  curPage = 1;
  state = {


    isLoaded: false,

    opportunities: [],

    page: 1,
    totPages: null,
    scrolling: false,

    editOpData: {
      id: '',
      title: '',
      description: ''
    },
    editOpModal: false
  }

  componentDidMount() {
    this.refreshOpList();
    //Scroll Listener
    this.scrollListner = window.addEventListener('scroll', (e) => {
      this.handleScroll(e)
    })
  }

  //Infinite scroll function
  handleScroll = (e) => {
    const { scrolling, totPages, page } = this.state
    if (scrolling) return
    if (totPages <= page) return

    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.loadMore()
    } else {
      return
    }
  }

  toggleEditOpModal() {
    this.setState({
      editOpModal: !this.state.editOpModal
    });


  }

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
    this.setState({
      editOpModal: false, editOpData: { id: '', title: '', description: '' }
    })


  }

  //PATCH request for editing opportunity data
  editOpportunity(id, title) {

    let reqInfo = 'http://api-staging.aiesec.org/v2/opportunities/';
    let accTok = '?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';

    axios.get(reqInfo + id + accTok).then((response) => {
      let description = response.data.description;
      this.setState({
        editOpData: { id, title, description }, editOpModal: !this.state.editOpModal
      });
    })

  }

  //Requesting data - GET
  refreshOpList = () => {
    const { opportunities, perPage, page } = this.state
    console.log(page);
    const req = 'https://api-staging.aiesec.org/v2/opportunities?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c&page=' + page
    axios.get(req).then((response) => {
      this.setState({
        opportunities: [...opportunities, ...response.data.data],
        scrolling: false,
        totPages: response.data.paging.total_pages,
        isLoaded: true
      })
    })

  }


  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      scrolling: true
    }), this.refreshOpList)

  }


  render() {
    var isLoaded = this.state.isLoaded;
    if (!isLoaded) {
      let style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
      };
      return <div style={style}><Spinner style={{ width: '5rem', height: '5rem' }} type="grow" color="primary" />      </div>;
    }

    //Displaying loaded data to the browser
    let opportunities = this.state.opportunities.map((opportunity) => {
      return (


        <tr key={opportunity.id}>
          <td><img src={opportunity.profile_photo_urls.thumb} alt="Pic" /></td>
          <td>{opportunity.id}</td>
          <td>{opportunity.title}</td>
          <td>{opportunity.location}</td>
          <td>
            <Button color="primary" size="sm" className="mr-2" onClick={this.editOpportunity.bind(this, opportunity.id, opportunity.title)}>Edit</Button>
          </td>
        </tr>

      )
    });
    return (

      <div className="App container">

        {/* Edit data modal */}
        <Modal isOpen={this.state.editOpModal} toggle={this.toggleEditOpModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditOpModal.bind(this)}>Edit Opportunity</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input id="title" value={this.state.editOpData.title} onChange={(e) => {

                let { editOpData } = this.state;

                editOpData.title = e.target.value;

                this.setState({ editOpData });

              }} />
            </FormGroup>


            <FormGroup>
              <Label for="description">Description</Label>
              <Input id="description" value={this.state.editOpData.description} onChange={(e) => {

                let { editOpData } = this.state;

                editOpData.description = e.target.value;
                console.log(editOpData.description);
                this.setState({ editOpData });

              }} />

            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateOpportunity.bind(this)}>Update Opportunity</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditOpModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Jumbotron>
          <h1 className="display-3">AIESEC Opportunities Portal</h1>
          <p className="lead">This is project created by Ravidu Silva</p>
          <p className="lead">Email - ravidu.silva@aiesec.net</p>
          <hr className="my-2" />
          <br></br>
          <Table dark className="opportunities">
            <thead>
              <tr>
                <th>Pic</th>
                <th>Number</th>
                <th>Title</th>
                <th>Location</th>
                <th>Controls</th>
              </tr>
            </thead>
            <tbody>

              {opportunities}

              {}
            </tbody>
          </Table>

        </Jumbotron>



        <Modal isOpen={this.state.scrolling}>

          <ModalHeader>Loading Opportunities...</ModalHeader>


        </Modal>


      </div>

    );
  }
}

export default App;
