import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { Card, Image, Container, Dimmer, Loader, Pagination, Button } from 'semantic-ui-react';
import  image  from './news-icon.png';
import  Footer  from './Footer';
import { PAGE_SIZE } from '../constants/constants';
import { changePage, markItemAsFavorite, revokeItemAsFavorite, itemsFetchData } from '../actions';
import moment from 'moment';
import { MdFavorite } from "react-icons/md";

class News extends Component {
	
	routeChange=(url)=> {
		window.open(url, "_blank");
	  }
	
	forceUpdateData=() => {
		this.props.fetchData(this.props.activeUrl)
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
									View Full Post
								</Button>
								  
								 <Button disabled={false}  
								style={{zIndex:999}} 
								class="ui button" 
								onClick={() => elem.isFavorite ? this.props.revokeItemAsFavorite(data.articles, index, this.forceUpdateData) : this.props.markItemAsFavorite(data.articles, index, this.forceUpdateData)}
									color={elem.isFavorite ? "red" : "green"} >
									{elem.isFavorite ? "Remove From Saved Items" : "Save For Later"}
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
	activeUrl: state.activeUrl  
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
	changePage: (activePage) => dispatch(changePage(activePage)),
	markItemAsFavorite: (items, index, callback) => dispatch(markItemAsFavorite(items, index, callback)),
	revokeItemAsFavorite: (items, index, callback) => dispatch(revokeItemAsFavorite(items, index, callback)),
	fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
