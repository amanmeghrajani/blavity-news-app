import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { Card, Image, Container, Dimmer, Loader, Pagination, Button } from 'semantic-ui-react';
import  image  from './news-icon.png';
import  Footer  from './Footer';
import { PAGE_SIZE } from '../constants/constants';
import { changePage, markItemAsFavorite, revokeItemAsFavorite } from '../actions';
import moment from 'moment';
import { MdFavorite } from "react-icons/md";

class News extends Component {
	
	routeChange=(url)=> {
		let path = url;
		let history = useHistory();
		history.push(path);
	  }
	
	render() {
		const { data,status } = this.props;
		if(status==="loading")
			return (
					<Dimmer active>
						<Loader />
					</Dimmer>	
		)
		else if(status==="success"){
			return (
			  <div>
					<Container style={{padding:'20px', zIndex:50}}>
						<Card.Group>
			        {!data.articles ? (null) : data.articles.map((elem,index)=> (
				        	<Card  key={index} color="red" centered raised>
				        		<Image
				        		bordered
				        		src={
				        			elem.urlToImage&&elem.urlToImage.substr(0,4)==="http"?elem.urlToImage:image
				        		}/>
				        		<Card.Content>
				        			<Card.Header>{elem.title}</Card.Header>
				        			<Card.Meta textAlign="right">{elem.author}</Card.Meta>
				        			<Card.Description>{elem.description}</Card.Description>
				        		</Card.Content>
				        		<Card.Content textAlign="right" extra>
				        			{elem.source.name}
				        			<br/>
				        			{moment(elem.publishedAt).format("dddd, MMM DD AT HH:mm a")}
									<br/>
									<br/>
				        		</Card.Content>
								<Button disabled={false}  
								onClick={() => this.routeChange(elem.url)}
								style={{zIndex:999}} 
								class="ui button" 
									color={"black"} >
									Details
								</Button>
								  
								 <Button disabled={false}  
								style={{zIndex:999}} 
								class="ui button" 
								onClick={() => elem.isFavorite ? this.props.revokeItemAsFavorite(elem.url) : this.props.markItemAsFavorite(elem.url)}
									color={elem.isFavorite ? "red" : "green"} >
									{elem.isFavorite ? "Remove as Favorite" : "Mark as Favorite"}
								</Button> 
				        	</Card>
			        ))}
		        </Card.Group>
		      </Container>
	        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
	          <Pagination
	            ellipsisItem={null}
	            inverted
	            totalPages={data.totalResults?Math.ceil(data.totalResults/PAGE_SIZE):3}
	            activePage={this.props.activePage}
	            onPageChange={(ev, { activePage }) => this.props.changePage(activePage) } />
	        </div>
	        <br/>		      
	        <Footer />
		    </div>
			)
		}
		else
			return null;
	}

}

const mapStateToProps = (state) => {
  return {
  	activePage: state.activePage,
  	data : state.data,
  	status : state.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
	changePage: (activePage) => dispatch(changePage(activePage)),
	markItemAsFavorite: (postId) => dispatch(markItemAsFavorite(postId)),
    revokeItemAsFavorite: (postId) => dispatch(revokeItemAsFavorite(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
