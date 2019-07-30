import React, { Component } from 'react'
import { getAllLabel, deleteLabel, updateLabel } from '../services/labelService';
import { InputBase } from '@material-ui/core';

export default class GetLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            mouseOver: false,
            labelId: '',
            editLabel: '',
        }
    }
    componentDidMount() {
        getAllLabel()
            .then(res => {
                this.setState({
                    allLabels: res.data
                })
                // console.log("all labels",res.data);
            })
    }

    handleMouseOver = (labelId, label) => {
        this.setState({
            mouseOver: !this.state.mouseOver,
            labelId: labelId,
            label: label
        })
    }

    handleDeleteLabel = (labelId) => {

        deleteLabel(labelId)
    }

    handleEditLabel = (labelId, label) => {

        this.setState({
            editLabel: true,
            labelId: labelId,
            label:label
        })
    }

    handleEditLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    handleUpdateLabels = (labelId) => {
        var data = {
            'label':this.state.label
        }

        console.log(data);
        
        updateLabel(data,labelId)
        .then(res => {
            console.log("updated successfully", res);
        })
        .catch(err => {
            console.log("error in update label", err);
            
        })
    }
    render() {
        const allLabels = this.state.allLabels.map(labels => {
            return (
                <div style={{ display: "flex" }}>
                    {!this.state.mouseOver ?
                        <div>
                            <img src={require('../assets/images/label.svg')}
                                alt="edit label"
                                onMouseOver={() => this.handleMouseOver(labels.id)}
                            />
                        </div>
                        :
                        (labels.id === this.state.labelId) ?
                            <div>
                                <img src={require('../assets/images/delete.svg')}
                                    alt="delete label"
                                    onClick={() => this.handleDeleteLabel(labels.id)}
                                    onMouseLeave={this.handleMouseOver}
                                />
                            </div>
                            :
                            <div>
                                <img src={require('../assets/images/label.svg')}
                                    alt="edit label"
                                    onMouseOver={() => this.handleMouseOver(labels.id)}
                                />
                            </div>
                    }
                    <div>
                       
                            {/* <InputBase
                        value = {labels.label}
                        readOnly
                        onClick={() => this.handleEditLabel(labels.id, labels.label)}
                        /> */}
                            <div>
                                {(labels.id === this.state.labelId) ?
                                    <div>
                                    <InputBase
                                        value={this.state.label}
                                        onChange={this.handleEditLabelChange}
                                        name="label"
                                        // onClick={() => this.handleEditLabel(labels.id)}
                                    />

                                    <img src={require('../assets/images/menuEdit.svg')}
                                        alt="edit label"
                                        onClick={() => this.handleUpdateLabels(labels.id)}
                                    />
                                    </div>

                                    :
                                    <InputBase
                                        value={labels.label}
                                        readOnly
                                        onClick={() => this.handleEditLabel(labels.id, labels.label)}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    )
                })
                return (
            <div>
                        {allLabels}
                    </div>
                    )
                }
            }
