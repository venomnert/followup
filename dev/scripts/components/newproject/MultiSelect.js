import React, { Component } from 'react';
import {isEmptyObj, getLast, checkDuplicate, immutableRemoveArray, immutableAddArray} from '../../lib/util';
import _ from 'lodash';

export class MultiSelect extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getSelectedItems = this.getSelectedItems.bind(this);
  }
  handleChange(e) {
    const userValue = e.target.value;
    if (!checkDuplicate(this.props.selected, userValue)) {
      const selected = immutableAddArray(this.props.selected, userValue);
      this.props.handleMultiSelect(this.props.name, selected);
    }
  }
  handleClick(e) {
    // console.log(typeof e.target.getAttribute('data-id'));
    const clickedvalue = e.target.getAttribute('data-id');
    const selected = immutableRemoveArray(this.props.selected, clickedvalue);
    console.log(selected);
    this.props.handleMultiSelect(this.props.name, selected);
  }
  getValue() {
    if (this.props.selected.length === 0) {
      return this.props.options[0].id;
    }
    else {
      let id = getLast(this.props.selected);
      // let value = this.props.options.forEach((option) => {
      //   if (option.id === id) {
      //     value = option.id;
      //   }
      // });
      // return value[0];
      return id;
    }
  }

  getSelectedItems() {
    let selectedItems = this.props.options.map((option) => {
      // console.log(this.props.selected.indexOf(option.id));
      if (this.props.selected.indexOf(option.id) >= 0) {
        return (
          <li
          onClick={this.handleClick}
          data-id={option.id}
          key={option.id}>{option.name}</li>
        );
      }
    });
    return selectedItems;
  }
  render() {
    const options = this.props.options.map((option) => {
      return <option
                key={option.id}
                value={option.id}>{option.name}</option>
    });

    let selectedItems = [];
    if (this.props.selected.length === 0) {
      selectedItems = <li>No {this.props.name}</li>;
    }
    else {
      selectedItems = this.getSelectedItems();
    }
    return (
      <div>
        <ul>{selectedItems}</ul>
        <select value={this.getValue()} onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  }
}
