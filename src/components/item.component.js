import React from "react";
import styled from 'styled-components'
import * as PropTypes from "prop-types";

const ItemComponent = ({id, name, description, images, sellingMode, handleItemClick}) => {
  return (
    <Container style={{backgroundImage: `url(${images[0].url})`}} onClick={() => handleItemClick(id)}>
      <Description>{name}</Description>
      <Description>{sellingMode.price.amount} zł</Description>
    </Container>
  )
};

ItemComponent.propTypes = {
  handleItemClick: PropTypes.func
};

ItemComponent.defaultProps = {
  handleItemClick: () => {}
};

const Container = styled.div`
    width: 200px;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 20px;
    background-color: #676767;
    outline: 10px solid #676767;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    transition: height 0.3s, opacity 0.3s, margin 0.3s;
        
    &:hover {
      :after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(53,77,239,0.28);
      }
    }
    
    &.fade-enter {
      height: 0;
      opacity: 0;
      margin: 0 20px;
    }
  
    &.fade-enter-active {
      height: 200px;
      opacity: 1;
      margin: 20px 20px;
    }
  
    &.fade-exit {
      height: 200px;
      opacity: 1;
      margin: 20px 20px;
    }
  
    &.fade-exit-active {
      height: 0;
      opacity: 0;
      margin: 0 20px;
    }
  `;

const Description = styled.b`
    padding: 5px;
    background-color: #000000c7;
    font-size: 12px;
  `;

export default ItemComponent;