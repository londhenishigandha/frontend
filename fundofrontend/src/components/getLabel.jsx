import React, { Component } from 'react'
import { getAllLabel, deleteLabel } from '../services/labelService';

export default class GetLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLabels: [],
            mouseOver: false,
            labelId: '',
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

    handleMouseOver = (labelId) => {
        this.setState({
            mouseOver: !this.state.mouseOver,
            labelId: labelId,
        })
    }

    handleDeleteLabel = (labelId) => {
        // this.setState({
        //     mouseOver: false,
        // })
        deleteLabel(labelId)
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
                    }<div>
                        {labels.label}
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
