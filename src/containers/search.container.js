import React, {Component} from 'react';
import ItemComponent from "../components/item.component";
import {Redirect} from "react-router-dom";
import styled from "styled-components";
import FavouriteItemsComponent from "../components/favourite-items.component";
import SpinnerComponent from "../components/spinner.component";
import {clients} from "../config/clients";

export default class SearchContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: localStorage.getItem('accessToken'),
      items: [],
      totalCount: 0,
      itemName: null,
      selectedItems: [],
      inProgress: false
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({
      inProgress: true,
      items: []
    });
    clients.allegroApi.client.get('/offers/listing', {
      params: {
        phrase: this.state.itemName
      }
    }).then((result) => {
      this.setState({
        items: [...result.data.items.promoted, ...result.data.items.regular],
        totalCount: result.data.searchMeta.totalCount,
        inProgress: false
      })
    });
  };

  handleInputChange = (e) => {
    this.setState({
      itemName: e.target.value
    });
  };

  handleItemClick = (itemId) => {
    if (this.state.selectedItems.map(e => e.id).includes(itemId)) {
      this.handleRemoveItem(itemId);
      return;
    }
    const selectedItem = this.state.items.find(e => e.id === itemId);
    this.setState({
      selectedItems: [selectedItem, ...this.state.selectedItems]
    });
  };

  handleRemoveItem = (itemId) => {
    const selectedItemIndex = this.state.selectedItems.findIndex(e => e.id === itemId);
    const items = [...this.state.selectedItems];
    items.splice(selectedItemIndex, 1);
    this.setState({
      selectedItems: items
    });
  };

  render() {
    if (!localStorage.getItem('accessToken')) {
      return <Redirect to='/'/>
    }

    return (
      <Container>
        <FavouriteItemsComponent items={this.state.selectedItems} handleRemoveItem={this.handleRemoveItem}/>
        <SearchPanelContainer>
          <h1>Find what you want!</h1>
          <form onSubmit={this.onSubmit}>
            <input type='text' placeholder='Type offer name' onChange={this.handleInputChange}/>
            <button type='submit'>Search</button>
          </form>
          {<h4>Found {this.state.totalCount} items.</h4>}
        </SearchPanelContainer>
        <ItemList active={this.state.items.length > 0}>
          {this.state.items.map(e =>
            <ItemComponent key={e.id} {...e} handleItemClick={this.handleItemClick}/>
          )}
        </ItemList>
        <SpinnerComponent inProgress={this.state.inProgress}/>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
`;

const SearchPanelContainer = styled.div`
  text-align: center;
  margin: 40px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-width: 1000px;
  
  transition: opacity 0.4s;
  opacity: ${({active}) => active ? 1 : 0}
`;