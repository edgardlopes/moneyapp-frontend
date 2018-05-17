import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getList, showUpdate, showDelete} from './billingCycleActions'



class BillingCycleList extends Component {
    componentWillMount(){
        this.props.getList()
    }

    renderRows(){
        return this.props.list.map(billingCycle => (
            <tr key={billingCycle._id}>
                <td>{billingCycle.name}</td>
                <td>{billingCycle.month}</td>
                <td>{billingCycle.year}</td>
                <td>
                    <button className="btn btn-warning" onClick={() => this.props.showUpdate(billingCycle)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <button className="btn btn-danger" onClick={() => this.props.showDelete(billingCycle)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.billingCycle.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)