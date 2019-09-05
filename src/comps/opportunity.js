import React, { Component } from 'react'
import { Button } from 'reactstrap';

class Opportunity extends Component {


  render() {

    let portal = this.props.portal
    let opp = this.props.opp
    return (
      <tr key={opp.id}>
        <td><img src={opp.profile_photo_urls.thumb} alt="Pic" /></td>
        <td>{opp.id}</td>
        <td>{opp.title}</td>
        <td>{opp.location}</td>
        <td>
          <Button color="primary" size="sm" className="mr-2" onClick={portal.editOpportunity.bind(portal, opp.id, opp.title)}>Edit</Button>
        </td>
      </tr>


    );

  }


}

export default Opportunity