import React, { Component } from 'react';
import Opportunity from './opportunity'
import axios from 'axios';
import { Table, Modal, ModalHeader, Spinner, Jumbotron } from 'reactstrap';
import EditModal from './EditModal';


class Portal extends Component {

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


    //PATCH request for editing opportunity data
    editOpportunity(id, title) {

      let reqInfo = process.env.REACT_APP_SERVER + process.env.REACT_APP_OBJ_OP;
      let accTok = '?access_token=' + process.env.REACT_APP_ACC_TOK;
  
      axios.get(reqInfo + '/' + id + accTok).then((response) => {
        let description = response.data.description;
        this.setState({
          editOpData: { id, title, description }, editOpModal: !this.state.editOpModal
        });
      })
  
    }
  

  //Requesting data - GET
  refreshOpList = () => {
    const { opportunities, page } = this.state
    console.log(page);
    const req = process.env.REACT_APP_SERVER + process.env.REACT_APP_OBJ_OP + '?access_token=' + process.env.REACT_APP_ACC_TOK + '&page=' + page
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
        <Opportunity opp={opportunity} portal={this} key={opportunity.id} />
      )
    });
    return (

      <div>
        {/* Edit data modal */}
        <EditModal portal={this} />

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

export default Portal;
