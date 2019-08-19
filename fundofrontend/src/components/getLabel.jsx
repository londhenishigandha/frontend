import React, { Component } from 'react'
import { getAllLabel, deleteLabel, updateLabel, addLabel } from '../services/labelService';
import { InputBase, Checkbox, FormControlLabel } from '@material-ui/core';

export default class GetLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            mouseOver: false,
            labelId: '',
            editLabel: '',
            label_list:[]
        }
    }
    componentDidMount() {
        getAllLabel()
            .then(res => {
                this.setState({
                    allLabels: res.data
                })
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
            label: label
        })
    }

    handleEditLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    handleUpdateLabels = (labelId) => {
        var data = {
            'label': this.state.label
        }

        console.log(data);

        updateLabel(data, labelId)
            .then(res => {
                console.log("updated successfully", res);
            })
            .catch(err => {
                console.log("error in update label", err);

            })
    }

    handleChange = (e, labelId) => {
        let isChecked = e.target.checked;
        let checkedValue = e.target.value
        console.log("checkbox value", isChecked, labelId, checkedValue);
        var labels =  this.state.label_list
        labels.push(labelId)
        this.setState({
            label_list : labels
        })

        console.log("Label List", this.state.label_list);
        
        if (isChecked) {
            var addData = {
                'noteId': this.props.noteID,
                data:{
                'label': labelId
            }
            }
            if(this.props.createLabelNote){
                    console.log("New Note Label ", this.state.label_list);
                    this.props.CreateNoteLabel(this.state.label_list)   
            }
            if(this.props.AddLabel){
            addLabel(addData)
                .then(() => {
                    console.log("updated successfully");
                    this.props.getLableToMoreOptions(true);
                })
                .catch((err) => {
                    console.log("error in addlabeltonote", err);
                })
            }
        }
            
    }
    
    render() {
        const labelList = this.state.allLabels.map(labels => {

            return (
                <div key={labels.id} style={{ marginLeft: "5%" }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={(e) => this.handleChange(e, labels.id)}
                                                value={labels.label}
                                                color="primary"
                                                style={{ padding: "0" }}
                                                size="small"
                                            />
                                        }
                                        label={labels.label}
                                    />
                                </div>
                )
        })
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
            this.props.createLabelNote ?
            <div>
                {labelList}
            </div>
            :
            <div>
                {allLabels}
            </div>
        )
    }
}
