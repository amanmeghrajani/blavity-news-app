import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Container, Dropdown, Menu, Pagination } from 'semantic-ui-react';

import { countries } from './constants/countryList';
import { categories } from './constants/categories';
import  image from './components/news-icon.png';
import errImg from './nonews.png';
import { URL, PAGE_SIZE } from './constants/constants';
import { itemsFetchData, changeCountry, changeCategory, changePage } from './actions';
import News from './components/News';
import './App.css';

class App extends Component {

  

  componentDidMount() {
    this.props.fetchData(URL+"country="+this.props.country+"&category="
      +this.props.category+"&pageSize="+PAGE_SIZE
      +"&page="+this.props.activePage+"&apiKey="+"3242628d0e444405991e61f88f7f4f60")
  }

  componentDidUpdate(prevProps) {
    if(this.props.country!==prevProps.country
      ||this.props.category!==prevProps.category
      ||this.props.activePage!==prevProps.activePage) {
        this.props.fetchData(URL+"country="+this.props.country+"&category="
          +this.props.category+"&pageSize="+PAGE_SIZE
          +"&page="+this.props.activePage+"&apiKey="+"3242628d0e444405991e61f88f7f4f60")
    }
  }




  render() {
    if(this.props.status!=="error") {
      return (
      <div style={{
        backgroundColor: "white",
        flex:'1'}}
        >
        <Menu fluid stackable inverted>
          <Container>
            <Menu.Item as='a' href="https://blavity.com/" header>
              <Image
                src={image}
                size="mini"
                style={{ marginRight: '1em' }}
              />
              Blavity News
            </Menu.Item>
            <Dropdown
              openOnFocus
              inline item placeholder='Category'
              options={ categories } 
              onChange = {(ev, {value} ) => this.props.changeCategory(value) } 
            />
            <Dropdown
              openOnFocus
              inline item placeholder='Country' 
              value={this.props.country} options={ countries }
              onChange = {(ev, {value} ) => this.props.changeCountry(value) }
            />
          </Container>
        </Menu>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Pagination
            style={{visibility:this.props.status==="loading"?'hidden':'visible'}}
            activePage={this.props.activePage}
            ellipsisItem={null}
            inverted
            totalPages={this.props.totalResults?Math.ceil(this.props.totalResults/PAGE_SIZE):3}
            onPageChange={(ev, { activePage }) => this.props.changePage(activePage) } />
        </div>
        <News />
      </div>  
      );
    }
    else {
        return (
          <div style={{marginTop:'10px',
            display:'flex',flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'}}
          >
            <Image src={errImg} size="big" centered />
            <h1 style={{textAlign:'center'}}><br/>No News Available</h1>
          </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
    totalResults: state.data.totalResults,
    country: state.country,
    category: state.category,
    activePage: state.activePage,
    activeUrl : state.activeUrl
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCountry: (countryName) => dispatch(changeCountry(countryName)),
    changeCategory: (categoryName) => dispatch(changeCategory(categoryName)),
    changePage: (activePage) => dispatch(changePage(activePage)),
    fetchData: (url) => dispatch(itemsFetchData(url))
 };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
